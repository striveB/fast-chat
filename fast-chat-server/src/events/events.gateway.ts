import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('juns')
  juns(@MessageBody() data: any): void {
    const result = {
      context: data,
    };
    this.server.emit('juns', result);
  }
}
