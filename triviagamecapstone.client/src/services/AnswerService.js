import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

class AnswerService {
  async getResponses() {
    try {
      // @ts-ignore
      const questionId = AppState.activeQuestion._id
      const res = await api.get('/api/responses/' + questionId)
      // console.log(res.data)
      AppState.teamAnswers = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async submitAnswer(answerData) {
    try {
      const res = await api.post('/api/responses/response/' + answerData.questionId, answerData)
      AppState.teamAnswers = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async toggleApproval(answersId) {
    try {
      const currentAnswer = AppState.teamAnswers.find(a => a._id === answersId)
      currentAnswer.approved = true
      // logger.log(currentAnswer)
      await api.put('/api/responses/' + answersId, currentAnswer)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const answerService = new AnswerService()
