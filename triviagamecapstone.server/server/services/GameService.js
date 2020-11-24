import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GameService {
  async getAllTeamsByGameId(userInfo, id) {
    if (userInfo.roles[0] === 'Host') {
      return await dbContext.Profile.find({ currentGame: id })
    } else {
      throw new BadRequest('These are not the users you are looking for')
    }
  }

  async joinGame(userInfo, id) {
    return await dbContext.Profile.findByIdAndUpdate(userInfo.id, { currentGame: id })
  }

  async getOneGame(gameId, userInfo) {
    const res = await dbContext.Games.findById(gameId)
    // @ts-ignore
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

  async deleteGame(game, userInfo) {
    const exists = await this.getOneGame(game, userInfo)

    if (!exists) {
      throw new BadRequest('This is not the game you are looking for')
    }
    await dbContext.Questions.deleteMany({ gameId: game })
    return await dbContext.Games.findByIdAndDelete(game)
  }
}

export const gameService = new GameService()
