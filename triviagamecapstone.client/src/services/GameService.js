import { api, triviaApi } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'

class GameService {
  async getGameTeams(gameId) {
    try {
      const res = await api.get('/api/profiles')
      const currentTeams = res.find(t => t.currentGame === gameId)
      AppState.gameTeams.push(currentTeams)
    } catch (error) {
      logger.error(error)
    }
  }

  async toggleApproval(answersId) {
    try {
      const currentAnswer = AppState.teamAnswers.find(a => a._id === answersId)
      currentAnswer.approved = true
      // logger.log(currentAnswer)
      await api.put('/api/responses/' + answersId, currentAnswer)
    } catch (error) {
      logger.error(error)
    }
  }

  async addQuestions(gameId, body) {
    try {
      await api.post('/api/questions/question/' + gameId, body)
    } catch (error) {
      logger.error(error)
    }
  }

  showActiveQuestion() {
    try {
      AppState.activeQuestion = AppState.gameQuestions[0]
      // logger.log(AppState.activeQuestion)
    } catch (error) {
      logger.error(error)
    }
  }

  nextQuestion() {
    try {
      const router = useRouter()
      // @ts-ignore
      let nextQuestion = AppState.gameQuestions.findIndex(q => q._id === AppState.activeQuestion._id)
      nextQuestion++
      if (nextQuestion > AppState.gameQuestions.length) {
        router.push({ name: 'AdminHomePage' })
      } else {
        AppState.activeQuestion = AppState.gameQuestions[nextQuestion]
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async getQuestions(numberOfQuestions, gameId) {
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
    try {
      const res = await api.get('/api/questions/' + gameId)
      // console.log(res.data)
      AppState.gameQuestions = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getResponses() {
    try {
      // @ts-ignore
      const questionId = AppState.activeQuestion._id
      const res = await api.get('/api/responses/' + questionId)
      // console.log(res.data)
      AppState.teamAnswers = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async submitAnswer(answerData) {
    try {
      const res = await api.post('/api/responses/response/' + answerData.questionId, answerData)
      AppState.teamAnswers = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteGame(gameId) {
    try {
      await api.delete('/api/games/' + gameId)
      this.getGames()
    } catch (error) {
      logger.error(error)
    }
  }

  async createGame(gameData) {
    try {
      await api.post('/api/games', gameData)
      this.getGames()
    } catch (error) {
      logger.error(error)
    }
  }

  async getGames() {
    try {
      const res = await api.get('/api/games')
      AppState.games = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const gameService = new GameService()
