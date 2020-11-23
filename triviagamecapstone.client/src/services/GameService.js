import { api, triviaApi } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

class GameService {
  async addQuestions(gameId, body) {
    try {
      await api.post('/api/questions/question/' + gameId, body)
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
      console.log(res.data)
      AppState.gameQuestions = res.data
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
