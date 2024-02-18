import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
  routes =[
    { path: 'first-component', component: FirstComponent },
    { path: 'second-component', component: SecondComponent },
    { path: '', redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  ];
})
export class LoginPageComponent {

  loginSignup: MenuItem[] | undefined;

  ngOnInit() {
    this.loginSignup = [
      { label: 'Login', icon: 'pi pi-fw pi-user' },
      { label: 'Sign Up', icon: 'pi pi-fw pi-user-plus' }
    ];
  }

}
