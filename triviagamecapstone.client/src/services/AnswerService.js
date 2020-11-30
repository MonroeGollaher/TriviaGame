import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

class AnswerService {
  async getResponses() {
    // NOTE - This function fetches the team's responses to the current question to be displayed to the host
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
    // NOTE - Sends team's answer to the host to be approved or denied
    try {
      const res = await api.post('/api/responses/response/' + answerData.questionId, answerData)
      logger.log('submit answer function', res)
      AppState.teamAnswers = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async toggleApproval(answersId) {
    // NOTE - This allows host to approve answers to award points
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
