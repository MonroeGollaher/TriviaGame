import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class QuestionService {
  // NOTE this function finds questions by their gameId, if the length of the array is greater than 0, the function prevents the creation of duplicate questions associated with that gameId, if the array is 0, the function creates the questions given from the trivia API
  async addQuestion(body, game) {
    const res = await this.getQuestionsByGameId(game)
    if (res.length > 0) {
      throw new BadRequest('Questions already loaded')
    } else {
      return await dbContext.Questions.create(body)
    }
  }

  // NOTE this function gets questions based on their gameId
  async getQuestionsByGameId(id) {
    return await dbContext.Questions.find({ gameId: id })
  }
}

export const questionService = new QuestionService()
