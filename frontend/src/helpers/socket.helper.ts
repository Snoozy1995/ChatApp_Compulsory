import { io } from "socket.io-client";

class SocketHelper {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log("SocketService");
      console.log(this.socket.id);
    });
  }
}
export default new SocketHelper();