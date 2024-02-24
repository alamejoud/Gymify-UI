import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SignUpServiceService } from '../Services/sign-up-service.service';
import { UserVO } from '../VO/UserVO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrl: './signup-popup.component.css'
})
export class SignupPopupComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private signUpService: SignUpServiceService, private router: Router, private cd: ChangeDetectorRef) { }

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
      this.signUpService.addUser(this.signUpService.mapUser(this.loginForm.value)).subscribe(
        {
          next: response => this.handleUpdateSuccess(response.message.headerMessage, response.message.bodyMessage),
          error: error => this.handleError(error.error.message)

        }
      )
    }
  }

  checkConfirmPassword(): boolean {
    if (this.loginForm.get('password').value?.length > 0) {
      this.loginForm.get('confirmPassword').enable({ onlySelf: true });
      return false;
    } else {
      this.loginForm.get('confirmPassword').disable({ onlySelf: true });
      this.loginForm.get('confirmPassword').reset();
      return true;
    }
  }

  checkPasswordSize(): boolean {

    return this.loginForm.get('password').value?.length < 8 || this.loginForm.get('password').value?.length > 30;
  }

  checkExistingNumber(): boolean {
    return this.loginForm.get('password').value?.match(/\d+/g) === null;
  }

  checkExistingSpecialCharacter(): boolean {
    return this.loginForm.get('password').value?.match(/[^a-zA-Z0-9]+/g) === null;
  }

  checkExistingUpperCase(): boolean {
    return this.loginForm.get('password').value?.match(/[A-Z]+/g) === null;
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

  handleUpdateSuccess(headerMessage: string, bodyMessage: string): void {
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
