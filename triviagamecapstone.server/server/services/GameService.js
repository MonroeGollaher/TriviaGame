import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GameService {
  async createNewGame(body, userInfo) {
    if (userInfo.role === 'Host') {
      return await dbContext.Games.create(body)
    } else {
      throw new BadRequest('Permission Denied!')
    }
  }

  async getAllGames(userId) {
    return await dbContext.Games.find({ creatorId: userId })
  }
}

export const gameService = new GameService()
