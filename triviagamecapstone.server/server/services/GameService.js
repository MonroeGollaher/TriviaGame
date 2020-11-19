import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GameService {
  async getOneGame(gameId, userInfo) {
    const res = await dbContext.Games.findById(gameId)
    if (userInfo.roles[0] === 'Host' && res._doc.creatorId === userInfo.id) {
      return res
    } else {
      throw new BadRequest('Permission Denied!')
    }
  }

  async getAllGames(userInfo) {
    if (userInfo.roles[0] === 'Host') {
      const res = await dbContext.Games.find({ creatorId: userInfo.id })
      return res
    } else {
      throw new BadRequest('Permission Denied!')
    }
  }

  async createNewGame(body, userInfo) {
    if (userInfo.roles[0] === 'Host') {
      return await dbContext.Games.create(body)
    } else {
      throw new BadRequest('Permission Denied!')
    }
  }

  async deleteGame(gameId, userInfo) {
    const exists = await this.getOneGame(gameId, userInfo)

    if (!exists) {
      throw new BadRequest('This is not the game you are looking for')
    }

    return await dbContext.Games.findByIdAndDelete(gameId)
  }
}

export const gameService = new GameService()
