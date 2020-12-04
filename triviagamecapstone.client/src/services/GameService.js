import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { notificationService } from '../services/NotificationService'

class GameService {
  async joinGame(profile) {
    // NOTE - attaches team to an active game
    try {
      const upperCaseRoomPin = profile.roomPin.toUpperCase()
      profile.roomPin = upperCaseRoomPin
      await api.put('/profile/joingame/' + profile.roomPin, profile)
      const res = await api.get('/profile')
      return res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getGameTeams(gameId) {
    // NOTE - Fetches teams attached to current game
    try {
      const res = await api.get('/profile/' + gameId)
      logger.log(res.data)
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
      gameData.roomPin = this.randomRoomPin()
      await api.post('/api/games', gameData)
      this.getGames()
    } catch (error) {
      logger.error(error)
    }
  }

  randomRoomPin() {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
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
      // res.data.activeQuestion = {}
      AppState.activeGame = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async removeTeam(teamId) {
    try {
      // remove team from from gameTeams array
      const team = AppState.gameTeams.findIndex(t => t.id === teamId)
      AppState.gameTeams.splice(team, 1)
      // remove currentGame and roomPin from profile
      AppState.profile.currentGame = null
      AppState.profile.currentPoints = 0
      AppState.profile.roomPin = ''
      const editedProfile = {
        currentGame: null,
        currentPoints: 0,
        roomPin: ''
      }
      logger.log(editedProfile)
      await api.put('/profile/' + teamId, editedProfile)
    } catch (error) {
      logger.error(error)
    }
  }

  async endGame(gameId) {
    try {
      await api.put('api/games/' + gameId + '/endgame')
      AppState.gameQuestions = []
    } catch (error) {
      logger.error(error)
    }
  }
}
export const gameService = new GameService()
