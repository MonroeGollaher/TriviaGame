import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'
// import { logger } from '../utils/Logger'

class RankingService {
  async updateScoresAndEndGame(id, userInfo) {
    if (userInfo.roles[0] === 'Host') {
      const game = await dbContext.Games.findById({ _id: id })
      this.updateTeamScores(game)
    }
  }

  async updateTeamScores(game) {
    // this should find the teams with the current gameId matching the game that is coming in
    const teams = await dbContext.Profile.find({ currentGame: game._doc._id })
    // then the teams that are found, should take their current total points, and push it into the totalScores array
    teams.forEach(e => {
      const points = e._doc.currentPoints
    })
    //
  }

  // create cascading function for deleting responses and then full delete of game
}

export const rankingService = new RankingService()
