import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GameService {
  // NOTE this function checks to see if the user accessing is a host, if so, the function fetches the teams associated with the gameId in the room/games
  async getAllTeamsByGameId(userInfo, id) {
    if (userInfo.roles[0] === 'Host') {
      return await dbContext.Profile.find({ currentGame: id })
    } else {
      throw new BadRequest('These are not the users you are looking for')
    }
  }

  // NOTE this function takes in the team info and finds the profile that matches userInfo id and assigns the current gameId to the team
  async joinGame(userInfo, id, body) {
    body.currentGame = id
    return await dbContext.Profile.findByIdAndUpdate(userInfo.id, body)
  }

  // NOTE this function finds the game by its id, then checks to see if the user is a host, if so, returns the game by that id to launch for host
  async getOneGame(gameId, userInfo) {
    const res = await dbContext.Games.findById(gameId)
    // @ts-ignore
    if (userInfo.roles[0] === 'Host' && res._doc.creatorId === userInfo.id) {
      return res
    } else {
      throw new BadRequest('Permission Denied!')
    }
  }

  // NOTE this function first checks to see if the user is a host, if so, returns the all the games assiociated with the hostId
  async getAllGames(userInfo) {
    if (userInfo.roles[0] === 'Host') {
      const res = await dbContext.Games.find({ creatorId: userInfo.id })
      return res
    } else {
      throw new BadRequest('Permission Denied!')
    }
  }

  // NOTE this function checks to see if the user is a host, if so, creates a game from the information from the trivia API
  async createNewGame(body, userInfo) {
    if (userInfo.roles[0] === 'Host') {
      return await dbContext.Games.create(body)
    } else {
      throw new BadRequest('Permission Denied!')
    }
  }

  // NOTE this function finds the game based on the gameId and userInfo(host), then if the item exists in the DB, the function deletes all of the questions associated with the gamesId and the then the game itself is deleted
  async deleteGame(game, userInfo) {
    const exists = await this.getOneGame(game, userInfo)

    if (!exists) {
      throw new BadRequest('This is not the game you are looking for')
    }
    await dbContext.Questions.deleteMany({ gameId: game })
    return await dbContext.Games.findByIdAndDelete(game)
  }

  async updateQuestion(game, body) {
    await dbContext.Games.findByIdAndUpdate(game, { activeQuestion: body }, { new: true })
  }
}

export const gameService = new GameService()
