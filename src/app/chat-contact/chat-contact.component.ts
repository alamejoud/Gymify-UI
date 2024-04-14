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
  search = '';

  constructor(private chatServiceService: ChatServiceService, private commonServiceService: CommonServiceService, private userServiceService: UserServiceService) {

  }

  ngOnInit() {
    this.chatServiceService.search = '';
    if (this.chatServiceService.updateUnreadChatsSubscription) {
      this.chatServiceService.updateUnreadChatsSubscription.unsubscribe();
    }
    this.chatServiceService.pendingContactResponse = false;
    this.chatServiceService.selectedContact = new UserVO();
    this.chatServiceService.msg = [];
    this.chatServiceService.search = '';
    for (let i = 0; i < 8; i++) {
      this.contacts.push(new UserVO());
    }
    this.loading = true;
    this.reloadContacts();
    this.chatServiceService.updateContactsSubscription = this.chatServiceService.updateContacts().subscribe({
      next: response => {
        this.loading = false;
        this.contacts = response.contacts;
        this.contacts.sort((a, b) => {
          return new Date(b.lastMessage?.messageDate || '01-01-1970').getTime() - new Date(a.lastMessage?.messageDate || '01-01-1970').getTime();
        });
        this.chatServiceService.pendingContactResponse = false;
        this.chatServiceService.unreadChats = this.contacts.filter(contact => contact.unreadMessages > 0).length;
      }, error: error => {
        console.log(error);
        this.chatServiceService.pendingContactResponse = false;
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.chatServiceService.updateContactsSubscription.unsubscribe();
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
      if (displayedMessage.messageFromUsername.toLowerCase() == this.commonServiceService.getUsername().toLowerCase()) {
        message = displayedMessage.messageStatus == 'sent' ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-check-double"></i>';
        message += 'You: ';
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
        if (contact.lastMessage?.messageStatus == 'sent' && contact.lastMessage?.messageFromUsername.toLowerCase() != this.commonServiceService.getUsername().toLowerCase()) {
          this.chatServiceService.unreadChats = String(Number(this.chatServiceService.unreadChats) - 1);
        }
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

      }, error: error => {
        this.commonServiceService.handleError(error);
        this.loading = false;
      }
    });
  }

}
