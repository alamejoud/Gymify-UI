import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrl: './signup-popup.component.css'
})
export class SignupPopupComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
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
    else if (this.signUpForm.valid) {
      this.userService.addUser(this.userService.mapUser(this.signUpForm.value)).subscribe(
        {
          next: response => this.handleSignupSuccess(response.message.headerMessage, response.message.bodyMessage),
          error: error => this.handleError(error.error.message)

        }
      )
    }
  }

  checkConfirmPassword(): boolean {
    if (this.signUpForm.get('password').value?.length > 0) {
      this.signUpForm.get('confirmPassword').enable({ onlySelf: true });
      return false;
    } else {
      this.signUpForm.get('confirmPassword').disable({ onlySelf: true });
      this.signUpForm.get('confirmPassword').reset();
      return true;
    }
  }

  checkPasswordSize(): boolean {

    return this.signUpForm.get('password').value?.length < 8 || this.signUpForm.get('password').value?.length > 30;
  }

  checkExistingNumber(): boolean {
    return this.signUpForm.get('password').value?.match(/\d+/g) === null;
  }

  checkExistingSpecialCharacter(): boolean {
    return this.signUpForm.get('password').value?.match(/[^a-zA-Z0-9]+/g) === null;
  }

  checkExistingUpperCase(): boolean {
    return this.signUpForm.get('password').value?.match(/[A-Z]+/g) === null;
  }

  validatePassword(): boolean {
    return this.checkPasswordSize() || this.checkExistingNumber() || this.checkExistingSpecialCharacter() || this.checkExistingUpperCase();
  }

  validateConfirmPassword(): boolean {
    return this.signUpForm.get('confirmPassword').value !== this.signUpForm.get('password').value;
  }

  validateSignupForm(): boolean {
    return this.validatePassword() || this.signUpForm.invalid;
  }

  handleSignupSuccess(headerMessage: string, bodyMessage: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'success', summary: headerMessage, detail: bodyMessage
    });
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`])
    })
  }

  handleError(message: string): void {
    console.log(message);
    this.messageService.clear();
    this.messageService.add({
      severity: 'error', summary: "Error", detail: message
    });

  }

}
