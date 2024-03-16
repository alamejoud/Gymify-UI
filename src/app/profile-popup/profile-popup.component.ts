import { Component, EventEmitter, Input, Output, SecurityContext } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { FileUploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.css'
})
export class ProfilePopupComponent {

  uploadToolbar: boolean = false;

  constructor(private userServiceService: UserServiceService, private messageService: MessageService, private commonServiceService: CommonServiceService) { }

  getUserService() {
    return this.userServiceService;
  }

  getLocalStorage() {
    return localStorage;
  }

  editProfile() {
    this.userServiceService.editedUser = JSON.parse(JSON.stringify(this.userServiceService.displayedUser));
    this.userServiceService.isEditingProfile = !this.userServiceService.isEditingProfile;
  }

  uploadProfilePicture($event: FileUploadEvent) {
    this.userServiceService.imageUrl = this.commonServiceService.transformImageFromFile($event.files[0]);
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile Picture uploaded successfully' });
  }

  showUploadToolbar() {
    this.uploadToolbar = !this.uploadToolbar;
  }

  saveProfile() {
    this.userServiceService.updateUser(this.userServiceService.editedUser).subscribe({
      next: response => {
        this.userServiceService.displayedUser = JSON.parse(JSON.stringify(this.userServiceService.editedUser));
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
      },
      error: error => {
        console.log(error);
      }
    });
  }

  cancelProfile() {
    this.userServiceService.editedUser = JSON.parse(JSON.stringify(this.userServiceService.displayedUser));
    this.userServiceService.isEditingProfile = !this.userServiceService.isEditingProfile;
  }
}
