import { Component, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  @Output() profileDialogVisible = new EventEmitter<any>();

  items: MenuItem[] | undefined;
  showLogoutConfirmationPopup: boolean = false;

  ngOnInit() {
    this.items = [
      {
        label: 'My Profile',
        command: () => this.showProfileDialog(true)
      },
      {
        label: 'My Chats'
      },
      {
        label: 'My Schedule'
      }



    ]
  }

  showProfileDialog(value: boolean) {
    this.profileDialogVisible.emit(value);
  }
  showLogoutConfirmation() {
    this.showLogoutConfirmationPopup = true;
  }
  cancelLogout() {
    this.showLogoutConfirmationPopup = false;
  }

  logout() {
    sessionStorage.clear();
    this.showLogoutConfirmationPopup = false;
    window.location.href = '/userLogin/login';
  }

}
