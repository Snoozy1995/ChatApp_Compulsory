import { io } from 'socket.io-client'

export class ChatService {
  socket = io('localhost:3000')

  constructor () {
    console.log('ChatService')
    this.socket.connect()
    this.socket.on('connect', () => {
      console.log(this.socket.id)
    })
  }
}
