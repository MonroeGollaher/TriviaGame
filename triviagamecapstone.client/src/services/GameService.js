import { api, triviaApi } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

class GameService {
  async getQuestions(numberOfQuestions) {
    try {
      const res = await triviaApi.get('/api.php?type=multiple&amount=' + numberOfQuestions)
      logger.log(res.data)
      AppState.questions = res.data
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
