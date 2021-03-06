import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { responseService } from '../services/ResponseService'
import socketService from '../services/SocketService'

export class ResponseController extends BaseController {
  constructor() {
    super('/api/responses')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:questionId', this.getResponsesByQuestionId)
      .post('/response/:questionId', this.addResponse)
      .put('/:responseId', this.toggleApproval)
  }

  // NOTE this function allows the host to change the approval of accepting question answers from the team's responses
  async toggleApproval(req, res, next) {
    try {
      const created = (await responseService.toggleApproval(req.body, req.params.responseId, req.userInfo))
      await socketService.messageRoom('activeGame', 'orderRanking', created)
      res.send(created)
    } catch (error) {
      next(error)
    }
  }

  // NOTE this function allows teams to create a response for a question given by the host. The teamId and questionId are associated with this
  async addResponse(req, res, next) {
    try {
      req.body.questionId = req.params.questionId
      req.body.teamId = req.userInfo.id
      const created = (await responseService.addResponse(req.body)).populate('creator')
      await socketService.messageRoom('activeGame', 'teamAnswer', created)
      res.send(created)
    } catch (error) {
      next(error)
    }
  }

  // NOTE this function gives the host the team's responses that are associated with the current question the game is on
  async getResponsesByQuestionId(req, res, next) {
    try {
      res.send(await responseService.getResponsesByQuestionId(req.params.questionId))
    } catch (error) {
      next(error)
    }
  }
}
