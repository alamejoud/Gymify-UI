import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SignUpServiceService } from '../Services/sign-up-service.service';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrl: './signup-popup.component.css'
})
export class SignupPopupComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private signUpService: SignUpServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required && Validators.minLength(8) && Validators.maxLength(30) && Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/g)],
      confirmPassword: [{ value: '', disabled: true }, Validators.required],
      role: ['trainee', Validators.required],
    });
  }

  addUser(): void {
    if (this.validateConfirmPassword()) {
      this.messageService.clear();
      this.messageService.add({
        severity: 'error', summary: 'Error', detail: 'Passwords do not match'
      });
    }
    else if (this.loginForm.valid) {
      this.signUpService.addUser(this.loginForm.value).subscribe(
        {
          next: this.handleUpdateSuccess.bind(this)
          ,
          error: this.handleError.bind(this)
        }
      )
    }
  }

  checkPasswordSize(): boolean {
    if (this.loginForm.get('password').value?.length > 0) {
      this.loginForm.get('confirmPassword').enable({ onlySelf: true })
    } else {
      this.loginForm.get('confirmPassword').disable({ onlySelf: true });
      this.loginForm.get('confirmPassword').reset();
    };
    return this.loginForm.get('password').value.length < 8 || this.loginForm.get('password').value.length > 30;
  }

  checkExistingNumber(): boolean {
    return this.loginForm.get('password').value.match(/\d+/g) === null;
  }

  checkExistingSpecialCharacter(): boolean {
    return this.loginForm.get('password').value.match(/[^a-zA-Z0-9]+/g) === null;
  }

  checkExistingUpperCase(): boolean {
    return this.loginForm.get('password').value.match(/[A-Z]+/g) === null;
  }

  validatePassword(): boolean {
    return this.checkPasswordSize() || this.checkExistingNumber() || this.checkExistingSpecialCharacter() || this.checkExistingUpperCase();
  }

  validateConfirmPassword(): boolean {
    return this.loginForm.get('confirmPassword').value !== this.loginForm.get('password').value;
  }

  validateSignupForm(): boolean {
    return this.validatePassword() || this.loginForm.invalid;
  }

  handleUpdateSuccess(): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'success', summary: 'Success', detail: 'User added successfully, you can now login with your credentials'
    });
  }

  handleError(): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'error', summary: 'Error', detail: 'Error creating the user'
    });
  }
}
