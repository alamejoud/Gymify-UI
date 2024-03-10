import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../Services/user-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { IdleServiceService } from '../Services/idle-service.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userServiceService: UserServiceService, private messageService: MessageService, private router: Router, private idleService: IdleServiceService) { }

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
          next: response => this.handleLoginSuccess(response.token),
          error: error => this.handleError(error.error.message)
        }
      )
    }
  }

  handleLoginSuccess(token: string): void {
    sessionStorage?.setItem('username', this.loginForm.get('username').value);
    sessionStorage?.setItem('token', token);
    this.router.navigate(['/home']);
  }

  handleError(message: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'error', summary: "Error", detail: message
    });

  }
}
