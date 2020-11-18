import { dbContext } from '../db/DbContext'

class GameService {
  async getAllGames(userId) {
    return await dbContext.Games.find({ creatorId: userId })
  }

  async createNewGame(body) {
    return await dbContext.Games.create(body)
  }
}

export const gameService = new GameService()
