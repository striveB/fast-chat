import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway(3002, {
  //   cors: {
  //     origin: '*',
  //   },
})
export class EventGateway {
  @WebSocketServer()
  server: Server;
  //scoket 连接成功钩子
  async handleConnection(client: Socket): Promise<string> {
    const userRoom = client.handshake.query.userId;
    if (userRoom) {
      client.join('system'); //每个登录的用户将加入到系统放假（用于发送系统通知）
      client.join(userRoom);
    }
    this.server.to(userRoom).emit('msg', { msg: '你好：我是服务端！' });
    return '连接成功';
  }
  // socket断连钩子
  async handleDisconnect(client: Socket): Promise<any> {
    console.log(client.handshake.query.uuId, '断开连接！');
  }

  @SubscribeMessage('juns')
  juns(@MessageBody() data: any): void {
    const result = {
      context: data,
    };
    this.server.emit('juns', result);
  }
}
