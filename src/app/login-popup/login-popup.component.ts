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

  constructor(private fb: FormBuilder, private userService: UserServiceService, private messageService: MessageService, private router: Router, private idleService: IdleServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.userService.mapUser(this.loginForm.value)).subscribe(
        {
          next: response => this.handleLoginSuccess(response.message),
          error: error => this.handleError(error.error.message)
        }
      )
    }
  }

  handleLoginSuccess(message: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'success', summary: 'Success', detail: message
    });
    sessionStorage.setItem('username', this.loginForm.get('username').value);
    this.router.navigate(['/home']);
  }

  handleError(message: string): void {
    console.log(message);
    this.messageService.clear();
    this.messageService.add({
      severity: 'error', summary: "Error", detail: message
    });

  }
}
