import { api, triviaApi } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

class QuestionService {
  async addQuestions(gameId, body) {
    // NOTE - Sends questions to our API to be attached to a game
    try {
      await api.post('/api/questions/question/' + gameId, body)
    } catch (error) {
      logger.error(error)
    }
  }

  showActiveQuestion() {
    // NOTE - Shows the current question
    try {
      if (AppState.activeQuestion === undefined) {
        AppState.activeQuestion = AppState.gameQuestions[0]
      // @ts-ignore
      } else if (typeof (AppState.activeGame.activeQuestion) !== 'object') {
        // @ts-ignore
        AppState.activeQuestion = AppState.gameQuestions[0]
        // @ts-ignore
        AppState.activeGame.activeQuestion = AppState.gameQuestions[0]
      }
      logger.log(AppState)
      AppState.wrongAnswers = []

      // @ts-ignore
      for (let i = 0; i < AppState.activeQuestion.wrongAnswers.length; i++) {
        // @ts-ignore
        AppState.wrongAnswers.push(AppState.activeQuestion.wrongAnswers[i])
      }
      // logger.log(AppState.activeQuestion)
    } catch (error) {
      logger.error(error)
    }
  }

  async nextQuestion(gameId) {
    // NOTE - cycles through the questions attached to the current game
    // @ts-ignore
    try {
      // @ts-ignore
      let nextQuestion = AppState.gameQuestions.findIndex(q => q._id === AppState.activeQuestion._id)
      nextQuestion++
      if (nextQuestion === AppState.gameQuestions.length) {
        AppState.activeQuestion = {}
        // return nextQuestion
      } else {
        AppState.teamAnswers = []
        // AppState.activeQuestion = AppState.gameQuestions[nextQuestion]
        // need to pass through actual gameId, and update activequestioncomponenet to show the active question on game model.
        logger.log('next question is', AppState.gameQuestions, nextQuestion)
        await api.put('/api/questions/' + gameId, AppState.gameQuestions[nextQuestion])
      }
      // AppState.wrongAnswers = []

      // for (let i = 0; i < AppState.activeQuestion.wrongAnswers.length; i++) {
      //   AppState.wrongAnswers.push(AppState.activeQuestion.wrongAnswers[i])
      // }
    } catch (error) {
      logger.error(error)
    }
  }

  async previousQuestion(gameId) {
    // NOTE - cycles through the questions attached to the current game
    try {
      // @ts-ignore
      let previousQuestion = AppState.gameQuestions.findIndex(q => q._id === AppState.activeQuestion._id)
      previousQuestion--
      if (previousQuestion === AppState.gameQuestions.length) {
        AppState.activeQuestion = {}
        return previousQuestion
      } else {
        AppState.teamAnswers = []
        // AppState.activeQuestion = AppState.gameQuestions[previousQuestion]
        // need to pass through actual gameId, and update activequestioncomponenet to show the active question on game model.

        await api.put('/api/questions/' + gameId, AppState.gameQuestions[previousQuestion])
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async getQuestions(numberOfQuestions, gameId) {
    // NOTE - fetches questions from the trivia api
    try {
      const res = await triviaApi.get('/api.php?type=multiple&amount=' + numberOfQuestions)
      // logger.log(res.data)
      AppState.questions = res.data
      this.addQuestions(gameId, AppState.questions)
    } catch (error) {
      logger.error(error)
    }
  }

  async getQuestionsByGameId(gameId) {
    // NOTE - This gets the questions attached to the active game
    try {
      const res = await api.get('/api/questions/' + gameId)
      // console.log(res.data)
      AppState.gameQuestions = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}
export const questionService = new QuestionService()
