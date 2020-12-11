import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { questionService } from '../services/QuestionService'
import socketService from '../services/SocketService'
import { gameService } from '../services/GameService'

export class QuestionController extends BaseController {
  constructor() {
    super('/api/questions')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:gameId', this.getQuestionsByGameId)
      .post('/question/:gameId', this.addQuestion)
      .put('/:gameId', this.nextQuestion)
  }

  // NOTE this function pulls questions in from the trivia API via an array, this iterates through and converts all of the questions to format the mongoDB schema of a question. This is a large collection that attaches a gameId to each question that is called for that matching game
  async addQuestion(req, res, next) {
    try {
      const questions = req.body.results
      questions.forEach(async(q, index) => {
        q.answer = q.correct_answer
        q.wrongAnswers = q.incorrect_answers
        questions[index].gameId = req.params.gameId
      })
      res.send(await questionService.addQuestion(questions, req.params.gameId))
    } catch (error) {
      next(error)
    }
  }

  // NOTE this function gets questions by their associated gameId for the host who pulls questions for a launching game
  async getQuestionsByGameId(req, res, next) {
    try {
      res.send(await questionService.getQuestionsByGameId(req.params.gameId))
    } catch (error) {
      next(error)
    }
  }

  async nextQuestion(req, res, next) {
    try {
      await gameService.updateQuestion(req.params.gameId, req.body)
      await socketService.messageRoom('activeGame', 'nextQuestion', req.body)
    } catch (error) {
      next(error)
    }
  }
}
