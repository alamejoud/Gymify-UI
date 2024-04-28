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
        component: WorkoutPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'workoutList',
            pathMatch: 'full'
          },
          {
            path: 'workoutList',
            component: WorkoutListComponent
          },
          {
            path: 'manageWorkout',
            component: WorkoutComponent
          },
          {
            path: 'manageWorkout/:workoutId',
            component: WorkoutComponent
          },
          {
            path: 'browseWorkout',
            component: BrowseWorkoutComponent
          }
        ]
      },
      {
        path: 'exercises',
        component: ExerciseComponent,
      },
      {
        path: 'exercises/:groupId/:categoryId',
        component: ExerciseListComponent
      },
      {
        path: 'trainerExercise',
        component: TrainerExerciseComponent,
        children: [
          {
            path: '',
            redirectTo: 'exercises',
            pathMatch: 'full'
          },
          {
            path: 'exercises',
            component: ExerciseComponent
          },
          {
            path: 'exercises/:groupId/:categoryId',
            component: ExerciseListComponent
          },
          {
            path: 'manageExercises',
            component: AddExercisesComponent
          },
          {
            path: 'manageExercises/:exerciseId',
            component: AddExercisesComponent
          }
        ]
      },
      {
        path: 'nutrition',
        component: NutritionPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'allRecipes',
            pathMatch: 'full'
          },
          {
            path: 'allRecipes',
            component: AllRecipesComponent
          },
          {
            path: 'createDietPlan',
            component: CreateDietPlanComponent
          },
          {
            path: 'dietPlanGenerator',
            component: DietPlanComponent
          }
        ]
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
