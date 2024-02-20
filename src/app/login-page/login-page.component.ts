import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {

  loginSignup: MenuItem[] | undefined;

  isSignup = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginSignup = [
      { label: 'Login', icon: 'pi pi-fw pi-user', command: () => { this.openLoginPopup() }, routerLink: '/loginPage/login' },
      { label: 'Sign Up', icon: 'pi pi-fw pi-user-plus', command: () => { this.openSignupPopup() }, routerLink: '/loginPage/signup' }
    ];
    this.route.url.subscribe(url => {
      // Get the activated route
      const activatedRoute = this.route.snapshot.children[0];
      // Get the component name from the activated route
      if ((activatedRoute.routeConfig?.component?.name || '') == '_SignupPopupComponent') {
        this.isSignup = true;
      }

    });
  }

  openLoginPopup() {
    this.isSignup = false;
  }

  openSignupPopup() {
    this.isSignup = true;
  }

}
