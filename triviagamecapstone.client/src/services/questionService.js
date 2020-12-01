import { api, triviaApi } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'

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
      AppState.activeQuestion = AppState.gameQuestions[0]
      // logger.log(AppState.activeQuestion)
    } catch (error) {
      logger.error(error)
    }
  }

  async nextQuestion() {
    // NOTE - cycles through the questions attached to the current game
    try {
      const router = useRouter()
      // @ts-ignore
      let nextQuestion = AppState.gameQuestions.findIndex(q => q._id === AppState.activeQuestion._id)
      nextQuestion++
      if (nextQuestion > AppState.gameQuestions.length) {
        router.push({ name: 'AdminHomePage' })
      } else {
        AppState.teamAnswers = []
        // AppState.activeQuestion = AppState.gameQuestions[nextQuestion]
        // need to pass through actual gameId, and update activequestioncomponenet to show the active question on game model.
        await api.put('/api/questions/string', AppState.gameQuestions[nextQuestion])
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
