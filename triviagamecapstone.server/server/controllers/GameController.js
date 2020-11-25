// NOTE Controller for Game launch and start, mostly has functionality for host/admin

import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { gameService } from '../services/GameService'
import { rankingService } from '../services/RankingService'

export class GameController extends BaseController {
  constructor() {
    super('/api/games')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllGames)
      .get('/:gameId', this.getOneGame)
      .post('', this.createNewGame)
      .put('/:gameId/endgame', this.updateScoresAndEndGame)
      .delete('/:gameId', this.deleteGame)
  }

  // NOTE this function updates the scores for all the teams in the game before ending the game. Sends gameId and host info to rankingService
  async updateScoresAndEndGame(req, res, next) {
    try {
      res.send(await rankingService.updateScoresAndEndGame(req.params.gameId, req.userInfo))
    } catch (error) {
      next(error)
    }
  }

  // NOTE this function deletes games and questons associated with it via host request.
  async deleteGame(req, res, next) {
    try {
      res.send(await gameService.deleteGame(req.params.gameId, req.userInfo))
    } catch (error) {
      next(error)
    }
  }

  // NOTE this funciton retreives one game by its Id for launch via host request
  async getOneGame(req, res, next) {
    try {
      res.send(await gameService.getOneGame(req.params.gameId, req.userInfo))
    } catch (error) {
      next(error)
    }
  }

  // NOTE this function creates a game for the host, hostId is attached to the creator which can be populated by FE
  async createNewGame(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await gameService.createNewGame(req.body, req.userInfo)).populate('creator')
    } catch (error) {
      next(error)
    }
  }

  // NOTE this function gets all the games associated with hostId, allows host to see all of their games created
  async getAllGames(req, res, next) {
    try {
      res.send(await gameService.getAllGames(req.userInfo)).populate('creator')
    } catch (error) {
      next(error)
    }
  }
}
