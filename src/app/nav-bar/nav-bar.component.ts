import { Component, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private userServiceService: UserServiceService) { }

  ngOnInit() {
  }

  showProfileDialog() {
    this.userServiceService.getUser(sessionStorage?.getItem('username')).subscribe({
      next: response => {
        this.userServiceService.displayedUser = response.user,
          this.userServiceService.profileDialogVisible = true;
        this.userServiceService.isEditingProfile = false;
      },
      error: error => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error', summary: "Error", detail: error.error.message
        });
      }
    });

  }

  logout() {
    sessionStorage.clear();
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

}
