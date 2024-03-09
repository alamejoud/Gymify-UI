import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.css'
})
export class ProfilePopupComponent {

  constructor(private userServiceService: UserServiceService) { }

  getUserService() {
    return this.userServiceService;
  }

  editProfile() {

  }
}
