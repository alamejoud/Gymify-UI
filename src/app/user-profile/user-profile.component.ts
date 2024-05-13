import { Component } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { MessageService } from 'primeng/api';
import { CommonServiceService } from '../Services/common-service.service';
import { FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  uploadToolbar: boolean = false;

  constructor(private userServiceService: UserServiceService, private messageService: MessageService, private commonServiceService: CommonServiceService) { }

  getUserService() {
    return this.userServiceService;
  }

  getLocalStorage() {
    return localStorage;
  }

  getLocation() {
    let location = '';
    if (this.userServiceService.selectedUser?.city && this.userServiceService.selectedUser?.city.trim().length > 0) {
      location += this.userServiceService.selectedUser?.city;
    }
    if (this.userServiceService.selectedUser?.address && this.userServiceService.selectedUser?.address.trim().length > 0) {
      if (location.length > 0) {
        location += ', ';
      }
      location += this.userServiceService.selectedUser?.address;
    }
    return location;
  }

  getCommonService() {
    return this.commonServiceService;
  }
}
