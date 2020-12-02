import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ResponseService {
  // NOTE this function finds the response associated with the responseId, then aliases out the wager associated with the teams reponse. The function then checks to see if the user is a host, then it finds the reponses based on id, adds their change in the approval value. The function then calls updatePoints.
  async toggleApproval(body, responseId, userInfo) {
    const response = await dbContext.Responses.findOne({ _id: responseId })
    // @ts-ignore
    const wager = response._doc.wager
    if (userInfo.roles[0] === 'Host') {
      await dbContext.Responses.findByIdAndUpdate(responseId, body, { new: true })
      // @ts-ignore
      const points = this.updatePoints(response._doc.teamId, wager, body.approved)

      return points
    } else {
      throw new BadRequest('Permission denied')
    }
  }

  // NOTE Cascading function from toggleApproval. This function finds the profiles based on the response._doc.teamId, then aliasing out the current value of the teams currentPoints. If the approvalValue coming in is true, the currentValue and wager are added together, and then updated to the team Object. If the approvalValue is false, the currentValue has the wager subtracted from it, and then updated to the team Object to reflect the currentPoints based on the approval from the host.
  async updatePoints(profileId, wager, approvedValue) {
    const profile = await dbContext.Profile.findById(profileId)
    // @ts-ignore
    let currentValue = profile._doc.currentPoints
    if (approvedValue === true) {
      currentValue += wager
      const reqBodyInc = {
        currentPoints: currentValue
      }
      return await dbContext.Profile.findByIdAndUpdate(profileId, reqBodyInc)
    } else if (approvedValue === false) {
      // NOTE We will need to refactor this and how it works
      currentValue -= wager
      const reqBodyDec = {
        currentPoints: currentValue
      }
      return await dbContext.Profile.findByIdAndUpdate(profileId, reqBodyDec)
    }
  }

  // NOTE this function finds team reponses based on the questionId they're associated with
  async getResponsesByQuestionId(id) {
    return await dbContext.Responses.find({ questionId: id })
  }

  // NOTE this creates responses for the teams to answer questions
  async addResponse(body) {
    return await dbContext.Responses.create(body)
  }
}

export const responseService = new ResponseService()
