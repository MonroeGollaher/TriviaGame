import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { notificationService } from '../services/NotificationService'

class GameService {
  async joinGame(profile) {
    // NOTE - attaches team to an active game
    try {
      console.log(profile)
      await api.put('/profile/joingame/' + profile.gameId, profile)
    } catch (error) {
      logger.error(error)
    }
  }

  async getGameTeams(gameId) {
    // NOTE - Fetches teams attached to current game
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
    // NOTE - Allows the host to delete a game that they've created
    try {
      if (await notificationService.deleteNotification()) {
        await api.delete('/api/games/' + gameId)
      }
      this.getGames()
    } catch (error) {
      logger.error(error)
    }
  }

  async createGame(gameData) {
    // NOTE - allows host to create a new game using the form
    try {
      await api.post('/api/games', gameData)
      this.getGames()
    } catch (error) {
      logger.error(error)
    }
  }

  async getGames() {
    // NOTE - fetches the games created by the logged in host
    try {
      const res = await api.get('/api/games')
      AppState.games = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveGame(gameId) {
    try {
      const res = await api.get('/api/games/' + gameId)
      AppState.activeGame = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}
export const gameService = new GameService()
