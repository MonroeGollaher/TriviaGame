import { Auth0Provider } from '@bcwdev/auth0provider'
import { gameService } from '../services/GameService'
import { profilesService } from '../services/ProfilesService'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('profile')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserProfile)
      .get('/:gameId', this.getAllTeamsByGameId)
      // .put('', this.editProfile)
      .put('/joingame/:gameId', this.joinGame)
  }

  async getAllTeamsByGameId(req, res, next) {
    try {
      res.send(await gameService.getAllTeamsByGameId(req.userInfo, req.params.gameId))
    } catch (error) {
      next(error)
    }
  }

  async joinGame(req, res, next) {
    try {
      res.send(await gameService.joinGame(req.userInfo, req.params.gameId))
    } catch (error) {
      next(error)
    }
  }

  // async editProfile(req, res, next) {
  //   try {
  //     res.send(await profilesService.updateProfile(req.userInfo))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getUserProfile(req, res, next) {
    try {
      const profile = await profilesService.getProfile(req.userInfo)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
