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
      .put('/:profileId', this.editProfile)
      .put('/joingame/:roomPin', this.joinGame)
  }

  // NOTE this function gets all the teams associated with a gamesId, this allows the host to see all of the teams for ranking.
  async getAllTeamsByGameId(req, res, next) {
    try {
      res.send(await gameService.getAllTeamsByGameId(req.userInfo, req.params.gameId))
    } catch (error) {
      next(error)
    }
  }

  // NOTE this function allows teams to join a game, this will be built out more with sockets to give the teams live updates when joining a room/game
  async joinGame(req, res, next) {
    try {
      res.send(await gameService.joinGame(req.userInfo, req.params.roomPin, req.body))
    } catch (error) {
      next(error)
    }
  }

  async editProfile(req, res, next) {
    try {
      res.send(await gameService.editProfile(req.body, req.params.profileId))
    } catch (error) {
      next(error)
    }
  }

  // NOTE prebuilt function using Auth0 to set profile to the profile info that comes in off of Auth0
  async getUserProfile(req, res, next) {
    try {
      const profile = await profilesService.getProfile(req.userInfo)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
