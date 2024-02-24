import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { SignupPopupComponent } from './signup-popup/signup-popup.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: 'loginPage',
    component: LoginPageComponent,
    children: [
      {
        path: 'login',
        component: LoginPopupComponent
      },
      {
        path: 'signup',
        component: SignupPopupComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/loginPage/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
