import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../Services/user-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { IdleServiceService } from '../Services/idle-service.service';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userServiceService: UserServiceService, private messageService: MessageService, private router: Router, private idleService: IdleServiceService, private commonServiceService: CommonServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.userServiceService.profileDialogVisible = false;
    if (this.loginForm.valid) {
      this.userServiceService.loginUser(this.userServiceService.mapUser(this.loginForm.value)).subscribe(
        {
          next: response => this.handleLoginSuccess(response),
          error: error => this.commonServiceService.handleError(error)
        }
      )
    }
  }

  handleLoginSuccess(response: any): void {
    localStorage?.setItem('token', response.token);
    this.userServiceService.displayedUser = response.user;
    this.userServiceService.imageUrl = this.commonServiceService.transformImage(this.userServiceService.displayedUser.profilePicture);
    this.userServiceService.profileDialogVisible = false;
    this.userServiceService.userProfileVisible = false;
    this.router.navigate(['/homePage']);

  }

}
