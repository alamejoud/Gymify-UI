import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UserServiceService } from '../Services/user-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { ChatServiceService } from '../Services/chat-service.service';
import { UserVO } from '../VO/UserVO';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private userServiceService: UserServiceService, private commonServiceService: CommonServiceService, private chatServiceService: ChatServiceService) { }

  ngOnInit() {
    if (this.chatServiceService.updateUnreadChatsSubscription) {
      this.chatServiceService.updateUnreadChatsSubscription.unsubscribe();
    }
    this.chatServiceService.pendingUnreadChatsResponse = false;
    this.userServiceService.getLoggedInUser().subscribe({
      next: response => {
        this.userServiceService.displayedUser = response.user;
        this.userServiceService.imageUrl = this.commonServiceService.transformImage(this.userServiceService.displayedUser.profilePicture);
      },
      error: error => {
        console.log(error);

      }
    });
    this.chatServiceService.getUnreadChats().subscribe({
      next: response => {
        this.chatServiceService.unreadChats = response.unreadChats;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getUserService() {
    return this.userServiceService;
  }

  showProfileDialog() {
    this.userServiceService.profileDialogVisible = true;
    this.userServiceService.isEditingProfile = false;
  }

  logout() {
    localStorage.clear();
    window.location.href = '/userLogin/login';
  }

  confirmLogout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.logout();
      }
    });
  }

  getCommonService() {
    return this.commonServiceService;
  }

  openChatPage() {
    this.chatServiceService.selectedContact = new UserVO();
    this.chatServiceService.chatPage = true;
  }

  getChatService() {
    return this.chatServiceService;
  }

}
