import { Component } from '@angular/core';
import { ChatServiceService } from '../Services/chat-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { MessageVO } from '../VO/MessageVO';
import { MessageFileVO } from '../VO/MessageFileVO';
import { UserVO } from '../VO/UserVO';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {

  constructor(private chatServiceService: ChatServiceService, private commonServiceService: CommonServiceService, private userServiceService: UserServiceService) {

  }
  getChatService() {
    return this.chatServiceService;
  }
  getCommonService() {
    return this.commonServiceService;
  }
}
