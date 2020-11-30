import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
// import { BadRequest } from '../utils/Errors'
// import { logger } from '../utils/Logger'

class RankingService {
  // NOTE this function checks to see if the user is a host, if so, the function finds the game associated with the gameId that is being passed in. Then, this function calls the updateTeamScores
  async updateScoresAndEndGame(id, userInfo) {
    if (userInfo.roles[0] === 'Host') {
      const game = await dbContext.Games.findById({ _id: id })
      this.updateTeamScores(game)
    } else {
      throw new BadRequest('You do not have permissions')
    }
  }

  // NOTE this function finds the teams associated with the gameId, then it iterates through all of the teams, and checks to see if they have an existing game in their gameScore array. If they dont, it will push the currentPoint value into the gameScores array, if they do, it will add the currentPoint value to their gameScores array with their prior scores.
  async updateTeamScores(game) {
    // this should find the teams with the current gameId matching the game that is coming in
    const teams = await dbContext.Profile.find({ currentGame: game._doc._id })
    // then the teams that are found, should take their current total points, and push it into the totalScores array
    teams.forEach(async e => {
      // @ts-ignore
      const calculatedPoints = e._doc.currentPoints
      // @ts-ignore
      if (e._doc.gameScores.length < 1) {
        const gameScore = { gameScores: [calculatedPoints] }
        await dbContext.Profile.findByIdAndUpdate(e._id, gameScore)
      } else {
        // @ts-ignore
        const currentScore = e._doc.gameScores
        const newScores = {
          gameScores: [...currentScore, calculatedPoints]
        }
        await dbContext.Profile.findByIdAndUpdate(e._id, newScores)
      }
      const resetScore = {
        currentPoints: 0
      }
      await dbContext.Profile.findByIdAndUpdate(e._id, resetScore)
    })

    // deleteGameResponses is called.
    this.deleteGameResponses(teams, game)
  }

  async deleteGameResponses(teams, game) {
    // this function finds all responses by the team in the current game, and deletes those responses.
    teams.forEach(async e => {
      await dbContext.Responses.deleteMany({ teamId: e._doc._id })
    })
    // removeCurrentGame is called
    this.removeCurrentGame(game)
  }

  async removeCurrentGame(game) {
    await dbContext.Games.findByIdAndDelete(game._doc._id)
  }
}

export const rankingService = new RankingService()
