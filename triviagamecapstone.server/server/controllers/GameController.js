import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { gameService } from '../services/GameService'

export class GameController extends BaseController {
  constructor() {
    super('/api/games')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllGames)
      .post('', this.createNewGame)
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
      res.send(await gameService.getAllGames(req.userInfo.id)).populate('creator')
    } catch (error) {
      next(error)
    }
  }
}
