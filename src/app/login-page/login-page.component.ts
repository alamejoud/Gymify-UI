import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {

  loginSignup: MenuItem[] | undefined;

  isSignup = false;

  ngOnInit() {
    this.loginSignup = [
      { label: 'Login', icon: 'pi pi-fw pi-user', command: () => { this.openLoginPopup() }, routerLink: '/loginPage/login' },
      { label: 'Sign Up', icon: 'pi pi-fw pi-user-plus', command: () => { this.openSignupPopup() }, routerLink: '/loginPage/signup' }
    ];
  }

  openLoginPopup() {
    this.isSignup = false;
  }

  openSignupPopup() {
    this.isSignup = true;
  }

}
