import { MessageVO } from "./MessageVO";
import { WorkoutVO } from "./WorkoutVO";

export class UserVO {
  userId: number;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  roleName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  status: string;
  statusName: string;
  title: string;
  profilePicture: ArrayBuffer;
  workouts: WorkoutVO[] = [];
  sentMessages: MessageVO[] = [];
  receivedMessages: MessageVO[] = [];
  unreadMessages: number = 0;
  lastMessage: MessageVO;

}
