import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { SignupPopupComponent } from './signup-popup/signup-popup.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuardGuard } from './auth-guard.guard';
import { tokenInterceptor } from './token.interceptor';
import { HomeComponent } from './home/home.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';

const routes: Routes = [
  {
    path: 'userLogin',
    component: LoginPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
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
    path: 'homePage',
    component: HomePageComponent,
    canActivate: [authGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'workout',
        component: WorkoutComponent
      },
      {
        path: 'exercises',
        component: ExerciseComponent,
      },
      {
        path: 'exercises/:groupId/:categoryId',
        component: ExerciseListComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/homePage',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
