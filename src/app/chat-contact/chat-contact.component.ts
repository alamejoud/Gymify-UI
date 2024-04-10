import { Component } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { ChatServiceService } from '../Services/chat-service.service';
import { UserVO } from '../VO/UserVO';
import { MessageVO } from '../VO/MessageVO';

@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat-contact.component.html',
  styleUrl: './chat-contact.component.css'
})
export class ChatContactComponent {

  contacts: any[] = [];
  loading: boolean = false;
  updateContactsSubscription;

  constructor(private chatServiceService: ChatServiceService, private commonServiceService: CommonServiceService, private userServiceService: UserServiceService) {

  }

  ngOnInit() {
    this.chatServiceService.pendingContactResponse = false;
    this.chatServiceService.selectedContact = new UserVO();
    this.chatServiceService.msg = [];
    this.chatServiceService.search = '';
    for (let i = 0; i < 8; i++) {
      this.contacts.push(new UserVO());
    }
    this.loading = true;
    this.reloadContacts();
    this.updateContactsSubscription = this.chatServiceService.updateContacts().subscribe({
      next: response => {
        this.loading = false;
        this.contacts = response.contacts;
        this.contacts.sort((a, b) => {
          return new Date(b.lastMessage?.messageDate || '01-01-1970').getTime() - new Date(a.lastMessage?.messageDate || '01-01-1970').getTime();
        });
        this.chatServiceService.pendingContactResponse = false;
      }, error: error => {
        this.commonServiceService.handleError(error);
        this.loading = false;
        this.chatServiceService.pendingContactResponse = false;
      }
    });
  }

  ngOnDestroy() {
    this.updateContactsSubscription.unsubscribe();
  }

  getChatService() {
    return this.chatServiceService;
  }


  getSeverity(role: string) {
    let severity = '';
    switch (role) {
      case 'admin':
        severity = 'danger';
        break;
      case 'trainer':
        severity = 'success';
        break;
      case 'trainee':
        severity = 'info';
        break;
      case 'dietitian':
        severity = 'warning';
        break;
      default:
        severity = 'primary';
        break;
    }
    return severity;
  }

  displayMessage(contact: UserVO) {
    let displayedMessage = contact.lastMessage;
    let message = '';
    if (displayedMessage != undefined) {
      if (displayedMessage.messageFromUsername == this.commonServiceService.getUsername()) {
        message = 'You: ';
      }
      if (displayedMessage.messageType == 'file') {
        message += '<i class="fa-solid fa-image"></i>Photo';
      } else {
        message += displayedMessage.message;
      }
    }
    return message;
  }

  markMessagesAsRead(contact: UserVO) {
    this.chatServiceService.markMessagesAsRead(contact.username).subscribe({
      next: response => {
        this.chatServiceService.reloadChat();
      }, error: error => {
        console.log(error);

      }
    });
  }

  getCommonService() {
    return this.commonServiceService;
  }

  reloadContacts() {
    this.chatServiceService.getContacts().subscribe({
      next: response => {
        this.loading = false;
        this.contacts = response.contacts;
        this.contacts.sort((a, b) => {
          return new Date(b.lastMessage?.messageDate || '01-01-1970').getTime() - new Date(a.lastMessage?.messageDate || '01-01-1970').getTime();
        });
        console.log(this.contacts);

      }, error: error => {
        this.commonServiceService.handleError(error);
        this.loading = false;
      }
    });
  }

}
