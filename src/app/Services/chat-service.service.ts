import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';
import { MessageVO } from '../VO/MessageVO';
import { CommonServiceService } from './common-service.service';
import { UserVO } from '../VO/UserVO';
import { MessageFileVO } from '../VO/MessageFileVO';
declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  chatPage: boolean = false;
  public stompClient;
  public msg = [];
  search: string = '';
  selectedContact: UserVO = new UserVO();
  pendingContactResponse = false;
  pendingUnreadChatsResponse = false;
  updateUnreadChatsSubscription;
  unreadChats;
  updateContactsSubscription;

  constructor(private http: HttpClient, private commonServiceService: CommonServiceService) {
    this.initializeWebSocketConnection();
  }
  getContacts(): Observable<any> {
    return this.http.get('http://localhost:9090/chat/getContacts?role=' + this.commonServiceService.getRole() + '&search=' + this.search);
  }
  getUnreadChats(): Observable<any> {
    return this.http.get('http://localhost:9090/chat/getUnreadChats');
  }
  getMessages(username: string): Observable<any> {
    return this.http.get('http://localhost:9090/chat/getMessages?username=' + username);
  }
  saveMessage(message: any): Observable<any> {
    return this.http.post('http://localhost:9090/chat/saveMessage', message);
  }
  markMessagesAsRead(username: string): Observable<any> {
    return this.http.get('http://localhost:9090/chat/markMessagesAsRead?username=' + username);
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:9090/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;

    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/message', (message) => {
        let messageVO = JSON.parse(message.body);
        debugger;
        if (messageVO.messageToUsername.toLowerCase() == that.commonServiceService.getUsername().toLowerCase() || messageVO.messageFromUsername.toLowerCase() == that.commonServiceService.getUsername().toLowerCase()) {
          const files = !messageVO.messageFiles ? [] : messageVO.messageFiles.map((file) => {
            return {
              url: file.fileSrc,
              type: file.fileType,
              icon: file.fileIcon,
            };
          });
          that.msg.push({
            text: messageVO.message,
            date: messageVO.messageDate,
            reply: messageVO.messageFromUsername.toLowerCase() == that.commonServiceService.getUsername().toLowerCase(),
            type: messageVO.messageType,
            files: files,
            user: {
              name: that.commonServiceService.titleCaseWord(messageVO.messageFromUsername),
            }
          });
        }
      }, () => {
        console.log('error');

      });
    });
  }

  sendMessage(message) {
    let data = {
      token: localStorage.getItem('token'),
      message: message.message,
      files: message.messageFiles,
      recipient: message.messageToUsername
    }
    this.stompClient.send('/app/send/message', {}, JSON.stringify(data));
  }

  updateContacts() {
    return interval(1000)
      .pipe(
        switchMap(() => this.sendContactRequest())
      );
  }

  sendContactRequest(): Observable<any> {
    if (this.pendingContactResponse) {
      return new Observable();
    }
    this.pendingContactResponse = true;
    return this.http.get<any>('http://localhost:9090/chat/getContacts?role=' + this.commonServiceService.getRole() + '&search=' + this.search)
  }

  reloadChat() {
    this.msg = [];
    this.getMessages(this.selectedContact.username).subscribe({
      next: response => {
        response.messages.forEach((message: MessageVO) => {
          const files = !message.messageFiles ? [] : message.messageFiles.map((file) => {
            return {
              url: file.fileSrc,
              type: file.fileType,
              icon: file.fileIcon,
            };
          });
          this.msg.push({
            text: message.message,
            date: message.messageDate,
            reply: message.messageFromUsername.toLowerCase() == this.commonServiceService.getUsername().toLowerCase(),
            type: message.messageType,
            files: files,
            user: {
              name: this.commonServiceService.titleCaseWord(message.messageFromUsername),
            }
          });
        });
      }, error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

}
