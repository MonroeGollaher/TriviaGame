import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
// import { BadRequest } from '../utils/Errors'
// import { logger } from '../utils/Logger'

class RankingService {
  async updateScoresAndEndGame(id, userInfo) {
    if (userInfo.roles[0] === 'Host') {
      const game = await dbContext.Games.findById({ _id: id })
      this.updateTeamScores(game)
    } else {
      throw new BadRequest('You do not have permissions')
    }
  }

  async updateTeamScores(game) {
    // this should find the teams with the current gameId matching the game that is coming in
    const teams = await dbContext.Profile.find({ currentGame: game._doc._id })
    // then the teams that are found, should take their current total points, and push it into the totalScores array
    teams.forEach(async e => {
      const calculatedPoints = e._doc.currentPoints
      if (e._doc.gameScores.length < 1) {
        const gameScore = { gameScores: [calculatedPoints] }
        await dbContext.Profile.findByIdAndUpdate(e._id, gameScore)
      } else {
        const currentScore = e._doc.gameScores
        const newScores = [...currentScore, calculatedPoints]
        await dbContext.Profile.findByIdAndUpdate(e._id, newScores)
      }
    })
    //
  }

  // create cascading function for deleting responses and then full delete of game
}

export const rankingService = new RankingService()
