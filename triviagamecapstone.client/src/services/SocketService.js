import io from 'socket.io-client'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import router from '../router'

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
      logger.log(data, 'hi answers are working!')
      AppState.teamAnswers = [...AppState.teamAnswers, data]
    })
    socket.on('deletedItem', data => {
      logger.log(data)
      router.push({ name: 'Items' })
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
