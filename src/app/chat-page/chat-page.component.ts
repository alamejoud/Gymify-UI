import { Component } from '@angular/core';
import { ChatServiceService } from '../Services/chat-service.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {

  constructor(private chatServiceService: ChatServiceService) {

  }

  getChatService() {
    return this.chatServiceService;
  }
}
