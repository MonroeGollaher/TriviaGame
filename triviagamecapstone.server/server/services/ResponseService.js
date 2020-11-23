import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ResponseService {
  async toggleApproval(body, responseId, userInfo) {
    if (userInfo.roles[0] === 'Host') {
      return await dbContext.Responses.findByIdAndUpdate(responseId, body, { new: true })
    } else {
      throw new BadRequest('Permission denied')
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
