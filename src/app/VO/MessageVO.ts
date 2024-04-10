import { MessageFileVO } from "./MessageFileVO";
import { UserVO } from "./UserVO";

export class MessageVO {
  messageId: number;
  message: string;
  messageDate: Date;
  messageStatus: string;
  messageType: string;
  messageFrom: UserVO;
  messageFromUsername: string;
  messageTo: UserVO;
  messageToUsername: string;
  messageFiles: MessageFileVO[];
}
