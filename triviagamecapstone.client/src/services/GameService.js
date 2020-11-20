import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

class GameService {
  async createGame(gameData) {
    try {
      await api.post('/api/games', gameData)
    } catch (error) {
      logger.error(error)
    }
  }

  async getGames() {
    try {
      const res = await api.get('/api/games')
      AppState.games = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const gameService = new GameService()
