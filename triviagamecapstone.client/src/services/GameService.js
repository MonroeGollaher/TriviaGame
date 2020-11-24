import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

class GameService {
  async joinGame(profile) {
    try {
      console.log(profile)
      await api.put('/profile/joingame/' + profile.gameId, profile)
    } catch (error) {
      logger.error(error)
    }
  }

  async getGameTeams(gameId) {
    try {
      const res = await api.get('/profile/' + gameId)
      console.log(res.data)
      // @ts-ignore
      AppState.gameTeams = res.data
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
