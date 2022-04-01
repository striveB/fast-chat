import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface Message {
  userId: number;
  friendId: number;
  context: string;
}

@WebSocketGateway(3002)
export class EventGateway {
  @WebSocketServer()
  server: Server;
  //scoket 连接成功钩子
  async handleConnection(client: Socket): Promise<string> {
    const userRoom = client.handshake.query.userId;
    if (userRoom) {
      client.join('system'); //每个登录的用户将加入到系统房间（用于发送系统通知）
      client.join(userRoom);
      console.log(userRoom + '已连接!');
      this.getOnlineUserIds();
    }
    return '连接成功';
  }

  @SubscribeMessage('chatMessage')
  chatMessage(@MessageBody() data: any): string {
    const { userId, friendId, context } = data;
    if (userId && friendId) {
      const message: Message = {
        userId,
        friendId,
        context,
      };
      this.server.to(friendId).emit('chatMessage', message);
      return '发送成功';
    } else {
      return '发送失败';
    }
  }

  // socket断连钩子
  async handleDisconnect(client: Socket): Promise<any> {
    console.log(client.handshake.query.uuId, '断开连接！');
    this.getOnlineUserIds();
  }
  //统计在线所有用户的id
  getOnlineUserIds(): void {
    // @ts-ignore;
    let userIdArr = Object.values(this.server.engine.clients).map((item) => {
      // @ts-ignore;
      return item.request._query.userId;
    });
    userIdArr = Array.from(new Set(userIdArr));
    this.server.emit('online', userIdArr);
  }
}
