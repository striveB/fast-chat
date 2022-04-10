import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RCode } from '../../common/constant/rcode';
import { UserService } from '../user/user.service';
import { MessageService } from '../message/message.service';
import { UserMessage } from '../message/entity/user_message.entity';
interface Message {
  userId: number;
  friendId: number;
  content: string;
}

@WebSocketGateway(3002)
export class EventGateway {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  @WebSocketServer()
  server: Server;
  //scoket 连接成功钩子
  async handleConnection(client: Socket) {
    const userRoom = client.handshake.query.userId as string;
    if (userRoom) {
      client.join('system'); //每个登录的用户将加入到系统房间（用于发送系统通知）
      client.join(userRoom);
      this.userService.findUserFriends(userRoom).then((friends) => {
        this.server.to(userRoom).emit('friends', friends);
      });
      console.log(userRoom + '已连接!');
    }
    return { code: RCode.OK, msg: '连接成功！' };
  }

  //建立好友房间
  @SubscribeMessage('createFriendRoom')
  createFriendRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    const { userId, friendId } = data;
    console.log(data);
    if (userId && friendId) {
      if (userId !== friendId) {
        const roomId = this.createRoomId(userId, friendId);
        client.join(roomId);
        console.log('创建了房间号', roomId);
        return { code: RCode.OK, msg: '房间建立成功！' };
      } else {
        return { code: RCode.FAIL, msg: '不能与自己建立房间！' };
      }
    } else {
      return { code: RCode.FAIL, msg: '房间建立失败！' };
    }
  }

  //发送消息
  @SubscribeMessage('chatMessage')
  async chatMessage(@MessageBody() data: any) {
    const { userId, friendId, content, msgType, createDate } = data;
    if (userId && friendId) {
      const message: UserMessage = {
        userId,
        friendId,
        msgType: msgType || 1,
        content,
        // createDate: createDate || new Date(),
      };
      const roomId = this.createRoomId(userId, friendId);
      console.log('发送到房间号：', roomId);
      const res = await this.messageService.saveMessage(message);
      this.server.to(roomId).emit('chatMessage', res);
      return { code: RCode.OK, msg: '发送成功！' };
    } else {
      return { code: RCode.FAIL, msg: '发送失败！' };
    }
  }

  // socket断连钩子
  async handleDisconnect(client: Socket): Promise<any> {
    console.log(client.handshake.query.userId, '断开连接！');
    // this.getOnlineUserIds();
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
  //创建房间id
  createRoomId(userId: string, friendId: string): string {
    return userId > friendId ? userId + '' + friendId : friendId + '' + userId;
  }
}
