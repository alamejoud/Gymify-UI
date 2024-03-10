import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { FileUploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.css'
})
export class ProfilePopupComponent {

  uploadToolbar: boolean = false;
  imageUrl: string = '../../assets/images/DefaultUserAvatar.png';

  constructor(private userServiceService: UserServiceService, private messageService: MessageService) { }

  getUserService() {
    return this.userServiceService;
  }

  getSessionStorage() {
    return sessionStorage;
  }

  editProfile() {
    this.userServiceService.editedUser = JSON.parse(JSON.stringify(this.userServiceService.displayedUser));
    this.userServiceService.isEditingProfile = !this.userServiceService.isEditingProfile;
  }

  uploadProfilePicture($event: FileUploadEvent) {
    this.userServiceService.getUser(sessionStorage?.getItem('token')).subscribe({
      next: response => {
        this.userServiceService.displayedUser = response.user;
      },
      error: error => {
        console.log(error);
      }
    });
    this.updateProfilePicture();
    console.log(this.userServiceService.displayedUser);
    this.userServiceService.editedUser = JSON.parse(JSON.stringify(this.userServiceService.displayedUser));
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile Picture uploaded successfully' });
  }

  showUploadToolbar() {
    this.uploadToolbar = !this.uploadToolbar;
  }

  saveProfile() {
    this.userServiceService.updateUser(this.userServiceService.editedUser).subscribe({
      next: response => {
        this.userServiceService.getUser(sessionStorage?.getItem('token')).subscribe({
          next: response => {
            this.userServiceService.displayedUser = response.user;
          },
          error: error => {
            console.log(error);
          }
        });
        this.updateProfilePicture();
        this.userServiceService.editedUser = JSON.parse(JSON.stringify(this.userServiceService.displayedUser));
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
  updateProfilePicture() {
    debugger;
    const bytes = new Uint8Array(this.userServiceService.displayedUser.profilePicture);
    let binaryText = '';
    bytes.forEach(byte => binaryText += String.fromCharCode(byte));
    const base64Image = btoa(binaryText);

    this.imageUrl = 'data:image/png;base64,' + base64Image;

  }
}
