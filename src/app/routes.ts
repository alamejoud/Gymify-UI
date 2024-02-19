import { Routes } from '@angular/router';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { SignupPopupComponent } from './signup-popup/signup-popup.component';


const routeConfig: Routes = [
  {
    path: 'login',
    component: LoginPopupComponent
  },
  {
    path: 'signup',
    component: SignupPopupComponent
  }

]

export default routeConfig;
