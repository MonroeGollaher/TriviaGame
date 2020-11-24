import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ResponseService {
  async toggleApproval(body, responseId, userInfo) {
    const response = await dbContext.Responses.findOne({ _id: responseId })
    // @ts-ignore
    const wager = response._doc.wager
    if (userInfo.roles[0] === 'Host') {
      const res = await dbContext.Responses.findByIdAndUpdate(responseId, body, { new: true })
      this.updatePoints(userInfo.id, wager, body.approved)
      return res
    } else {
      throw new BadRequest('Permission denied')
    }
  }

  async updatePoints(profileId, wager, approvedValue) {
    const profile = await dbContext.Profile.findById(profileId)
    let currentValue = profile._doc.currentPoints
    if (approvedValue === true) {
      currentValue += wager
      const reqBodyInc = {
        currentPoints: currentValue
      }
      await dbContext.Profile.findByIdAndUpdate(profileId, reqBodyInc)
    } else if (approvedValue === false) {
      currentValue -= wager
      const reqBodyDec = {
        currentPoints: currentValue
      }
      await dbContext.Profile.findByIdAndUpdate(profileId, reqBodyDec)
    }
  }

  async getResponsesByQuestionId(id) {
    return await dbContext.Responses.find({ questionId: id })
  }

  async addResponse(body) {
    return await dbContext.Responses.create(body)
  }
}

export const responseService = new ResponseService()
