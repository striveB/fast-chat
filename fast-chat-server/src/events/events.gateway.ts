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
  juns(@MessageBody() data: any): object[] {
    console.log(data);
    return [
      {
        context: '123',
      },
    ];
  }
}
