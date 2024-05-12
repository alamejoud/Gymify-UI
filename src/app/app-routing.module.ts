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
import { TrainerExerciseComponent } from './trainer-exercise/trainer-exercise.component';
import { AddExercisesComponent } from './add-exercises/add-exercises.component';
import { WorkoutPageComponent } from './workout-page/workout-page.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { BrowseWorkoutComponent } from './browse-workout/browse-workout.component';
import { NutritionPageComponent } from './nutrition-page/nutrition-page.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { CreateDietPlanComponent } from './create-diet-plan/create-diet-plan.component';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { BrowseDietsComponent } from './browse-diets/browse-diets.component';

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
    data: { roles: ['admin', 'trainer', 'dietitian', 'trainee'] },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        canActivate: [authGuardGuard],
        data: { roles: ['admin', 'trainer', 'dietitian', 'trainee'] },
        component: HomeComponent
      },
      {
        path: 'workout',
        component: WorkoutPageComponent,
        canActivate: [authGuardGuard],
        data: { roles: ['admin', 'trainer', 'trainee'] },
        children: [
          {
            path: '',
            redirectTo: 'workoutList',
            pathMatch: 'full'
          },
          {
            path: 'workoutList',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainer', 'trainee'] },
            component: WorkoutListComponent
          },
          {
            path: 'workoutList/:workoutId',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainer', 'trainee'] },
            component: WorkoutListComponent
          },
          {
            path: 'manageWorkout',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainer', 'trainee'] },
            component: WorkoutComponent
          },
          {
            path: 'manageWorkout/:workoutId',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainer', 'trainee'] },
            component: WorkoutComponent
          },
          {
            path: 'browseWorkout',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainee'] },
            component: BrowseWorkoutComponent
          }
        ]
      },
      {
        path: 'exercises',
        canActivate: [authGuardGuard],
        data: { roles: ['trainee'] },
        component: ExerciseComponent,
      },
      {
        path: 'exercises/:groupId/:categoryId',
        canActivate: [authGuardGuard],
        data: { roles: ['trainee'] },
        component: ExerciseListComponent
      },
      {
        path: 'trainerExercise',
        canActivate: [authGuardGuard],
        data: { roles: ['admin', 'trainer'] },
        component: TrainerExerciseComponent,
        children: [
          {
            path: '',
            redirectTo: 'exercises',
            pathMatch: 'full'
          },
          {
            path: 'exercises',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainer'] },
            component: ExerciseComponent
          },
          {
            path: 'exercises/:groupId/:categoryId',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainer'] },
            component: ExerciseListComponent
          },
          {
            path: 'manageExercises',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainer'] },
            component: AddExercisesComponent
          },
          {
            path: 'manageExercises/:exerciseId',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainer'] },
            component: AddExercisesComponent
          }
        ]
      },
      {
        path: 'nutrition',
        canActivate: [authGuardGuard],
        data: { roles: ['admin', 'dietitian', 'trainee'] },
        component: NutritionPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'allRecipes',
            pathMatch: 'full'
          },
          {
            path: 'allRecipes',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'dietitian', 'trainee'] },
            component: AllRecipesComponent
          },
          {
            path: 'createDietPlan',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'dietitian', 'trainee'] },
            component: CreateDietPlanComponent
          },
          {
            path: 'createDietPlan/:dietId',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'dietitian', 'trainee'] },
            component: CreateDietPlanComponent
          },
          {
            path: 'dietPlanGenerator',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainee'] },
            component: DietPlanComponent
          },
          {
            path: 'browseDiets',
            canActivate: [authGuardGuard],
            data: { roles: ['admin', 'trainee'] },
            component: BrowseDietsComponent
          }
        ]
      },
      {
        path: 'pageNotFound',
        component: PageNotFoundComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/homePage',
    pathMatch: 'full'
  },
  {
    path: 'pageNotFound',
    component: PageNotFoundComponent

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
