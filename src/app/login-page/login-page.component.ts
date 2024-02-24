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
      console.log(this.route.snapshot);

      const activatedRoute = this.route.snapshot.children[0];

      if ((activatedRoute.routeConfig?.component?.name || '') == '_SignupPopupComponent') {
        this.openSignupPopup();
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
