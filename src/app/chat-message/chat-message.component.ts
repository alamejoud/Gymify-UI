import { Component } from '@angular/core';
import { ChatServiceService } from '../Services/chat-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { MessageVO } from '../VO/MessageVO';
import { MessageFileVO } from '../VO/MessageFileVO';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {

  constructor(private chatServiceService: ChatServiceService, private commonServiceService: CommonServiceService, private userServiceService: UserServiceService) {

  }

  getChatService() {
    return this.chatServiceService;
  }

  getCommonService() {
    return this.commonServiceService;
  }

  sendMessage(event: any) {
    const filesToSend: MessageFileVO[] = !event.files ? [] : event.files.map((file) => {
      let messageFile: MessageFileVO = new MessageFileVO();
      messageFile.fileName = file.name;
      messageFile.fileType = file.type;
      messageFile.fileSrc = file.src;
      messageFile.fileIcon = 'file-text-outline';
      return messageFile;
    });

    let message: MessageVO = new MessageVO();
    message.message = event.message;
    message.messageDate = new Date();
    message.messageStatus = 'sent';
    message.messageType = filesToSend.length ? 'file' : 'text';
    message.messageFromUsername = this.getCommonService().getUsername();
    message.messageToUsername = this.chatServiceService.selectedContact.username;
    message.messageFiles = filesToSend;

    if (message.messageFiles.length == 0) {
      this.chatServiceService.sendMessage(message);
    } else {
      this.chatServiceService.saveMessage(message).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }

}
