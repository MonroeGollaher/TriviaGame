import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { questionService } from '../services/QuestionService'

export class QuestionController extends BaseController {
  constructor() {
    super('/api/questions')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:gameId', this.getQuestionsByGameId)
      .post('/question/:gameId', this.addQuestion)
  }

  async addQuestion(req, res, next) {
    try {
      const questions = req.body
      questions.forEach(async(q, index) => {
        questions[index].gameId = req.params.gameId
      })
      res.send(await questionService.addQuestion(questions))
    } catch (error) {
      next(error)
    }
  }

  async getQuestionsByGameId(req, res, next) {
    try {
      res.send(await questionService.getQuestionsByGameId(req.params.gameId))
    } catch (error) {
      next(error)
    }
  }
}
