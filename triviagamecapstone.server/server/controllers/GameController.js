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

  async updateScoresAndEndGame(req, res, next) {
    try {
      res.send(await rankingService.updateScoresAndEndGame(req.params.gameId, req.userInfo))
    } catch (error) {
      next(error)
    }
  }

  async deleteGame(req, res, next) {
    try {
      res.send(await gameService.deleteGame(req.params.gameId, req.userInfo))
    } catch (error) {
      next(error)
    }
  }

  async getOneGame(req, res, next) {
    try {
      res.send(await gameService.getOneGame(req.params.gameId, req.userInfo))
    } catch (error) {
      next(error)
    }
  }

  async createNewGame(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await gameService.createNewGame(req.body, req.userInfo)).populate('creator')
    } catch (error) {
      next(error)
    }
  }

  async getAllGames(req, res, next) {
    try {
      res.send(await gameService.getAllGames(req.userInfo)).populate('creator')
    } catch (error) {
      next(error)
    }
  }
}
