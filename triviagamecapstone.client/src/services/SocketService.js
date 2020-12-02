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
      logger.log(data)
      AppState.activeQuestion = data
    })
    socket.on('teamAnswer', data => {
      logger.log('hi answers are working!')
      AppState.teamAnswers = [...AppState.teamAnswers, data]
    })
    socket.on('orderRanking', data => {
      logger.log(data, 'hello from order ranking')
      const editedTeam = AppState.gameTeams.findIndex(t => t._id === data._id)
      AppState.gameTeams.splice(editedTeam, 1, data)
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
