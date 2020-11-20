import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'

class QuestionService {
  async addQuestion(body) {
    return await dbContext.Questions.create(body)
  }

  async getQuestionsByGameId(id) {
    return await dbContext.Questions.find({ gameId: id })
  }
}

export const questionService = new QuestionService()
