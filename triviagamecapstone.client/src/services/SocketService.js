import io from 'socket.io-client'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

let socket = {}
class SocketService {
  initializeSocket() {
    socket = io('//localhost:3000/')

    socket.on('CONNECTED', data => {
      logger.log(data.message + ' Let the villany commence')
    })
    // NOTE REGISTER ADDITIONAL LISTENERS
    socket.on('nextQuestion', data => {
      logger.log('next question?', data)
      AppState.activeQuestion = data
    })
    socket.on('teamAnswer', data => {
      logger.log('hi answers are working!')
      AppState.teamAnswers.push(data)
    })
    socket.on('orderRanking', data => {
      logger.log(data, 'hello from order ranking')
      const exists = AppState.gameTeams.find(t => t._id === data._id)
      if (exists) {
        const editedTeam = AppState.gameTeams.findIndex(t => t._id === data._id)
        AppState.gameTeams.splice(editedTeam, 1, data)
      } else {
        AppState.gameTeams.push(data)
      }
    })
  }

  joinRoom(roomName) {
    logger.log('hi from join room')
    socket.emit('dispatch', { action: 'JoinRoom', data: roomName })
  }

  leaveRoom(roomName) {
    logger.log('left the room')
    socket.emit('disconnect', { action: 'LeaveRoom', data: roomName })
  }
}

const socketService = new SocketService()

export default socketService
