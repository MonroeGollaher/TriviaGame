import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class QuestionService {
  async addQuestion(body, game) {
    const res = await this.getQuestionsByGameId(game)
    if (res.length > 0) {
      throw new BadRequest('Questions already loaded')
    } else {
      return await dbContext.Questions.create(body)
    }
  }

  async getQuestionsByGameId(id) {
    return await dbContext.Questions.find({ gameId: id })
  }
}

export const questionService = new QuestionService()
