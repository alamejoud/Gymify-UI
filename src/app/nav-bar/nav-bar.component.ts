import { Component, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UserServiceService } from '../Services/user-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { ChatServiceService } from '../Services/chat-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private userServiceService: UserServiceService, private commonServiceService: CommonServiceService, private chatServiceService: ChatServiceService) { }

  ngOnInit() {
    this.userServiceService.getLoggedInUser().subscribe({
      next: response => {
        this.userServiceService.displayedUser = response.user;
        this.userServiceService.imageUrl = this.commonServiceService.transformImage(this.userServiceService.displayedUser.profilePicture);
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
    this.chatServiceService.chatPage = true;
  }

}
