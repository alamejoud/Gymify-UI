import { Component, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  profileDialogVisible: any = false;

  showLogoutConfirmationPopup: boolean = false;

  ngOnInit() {
  }

  showProfileDialog() {
    this.profileDialogVisible = true;
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
