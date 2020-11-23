import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { responseService } from '../services/ResponseService'

export class ResponseController extends BaseController {
  constructor() {
    super('/api/responses')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:questionId', this.getResponsesByQuestionId)
      .post('/response/:questionId', this.addResponse)
      .put('/:responseId', this.toggleApproval)
  }

  async toggleApproval(req, res, next) {
    try {
      res.send(await responseService.toggleApproval(req.body, req.params.responseId, req.userInfo))
    } catch (error) {
      next(error)
    }
  }

  async addResponse(req, res, next) {
    try {
      req.body.questionId = req.params.questionId
      req.body.teamId = req.userInfo.id
      res.send(await responseService.addResponse(req.body)).populate('creator')
    } catch (error) {
      next(error)
    }
  }

  async getResponsesByQuestionId(req, res, next) {
    try {
      res.send(await responseService.getResponsesByQuestionId(req.params.questionId))
    } catch (error) {
      next(error)
    }
  }
}
