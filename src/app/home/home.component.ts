import { Component } from '@angular/core';
import { WorkoutServiceService } from '../Services/workout-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { WorkoutVO } from '../VO/WorkoutVO';
import { DietVO } from '../VO/DietVO';
import { NutritionServiceService } from '../Services/nutrition-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { UserVO } from '../VO/UserVO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  myWorkouts: WorkoutVO[] = [];
  myDiets: DietVO[] = [];
  trainers: UserVO[] = [];
  dietitians: UserVO[] = [];
  trainees: UserVO[] = [];


  constructor(private workoutServiceService: WorkoutServiceService, private commonServiceService: CommonServiceService
    , private nutritionServiceService: NutritionServiceService, private userServiceService: UserServiceService) {

  }

  ngOnInit() {
    this.workoutServiceService.getMyWorkoutNames().subscribe({
      next: (response) => {
        this.myWorkouts = response.workoutNames;
      },
      error: (error) => {
        console.log(error);

      }
    });
    this.nutritionServiceService.getMyDietNames().subscribe({
      next: (response) => {
        this.myDiets = response.dietNames;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.userServiceService.getUsers('trainer').subscribe({
      next: (response) => {
        this.trainers = response.users;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.userServiceService.getUsers('dietitian').subscribe({
      next: (response) => {
        this.dietitians = response.users;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.userServiceService.getUsers('trainee').subscribe({
      next: (response) => {
        this.trainees = response.users;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  isTrainer() {
    return this.commonServiceService.getRole() == 'trainer';
  }

  isDietitian() {
    return this.commonServiceService.getRole() == 'dietitian';
  }

  isTrainee() {
    return this.commonServiceService.getRole() == 'trainee';
  }

  isAdmin() {
    return this.commonServiceService.getRole() == 'admin';
  }

  getCommonService() {
    return this.commonServiceService;
  }

  getUserService() {
    return this.userServiceService;
  }

  openUser(user) {
    this.userServiceService.selectedUser = user;
    this.userServiceService.userProfileVisible = true;
  }
}
