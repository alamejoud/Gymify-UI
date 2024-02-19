import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrl: './signup-popup.component.css'
})
export class SignupPopupComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required && Validators.minLength(8) && Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/g)],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
      // Add your login logic here
    }
  }

  checkPasswordSize(): boolean {
    return this.loginForm.get('password').value.length < 8;
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
}
