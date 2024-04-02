import { Component, ElementRef, ViewChild } from '@angular/core';
import { WorkoutServiceService } from '../Services/workout-service.service';
import { ExerciseVO } from '../VO/ExerciseVO';
import { WorkoutVO } from '../VO/WorkoutVO';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { WorkoutExerciseVO } from '../VO/WorkoutExerciseVO';
import { CommonServiceService } from '../Services/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-browse-workout',
  templateUrl: './browse-workout.component.html',
  styleUrl: './browse-workout.component.css'
})
export class BrowseWorkoutComponent {


  workouts: WorkoutVO[];
  selectedWorkout: WorkoutVO = new WorkoutVO();
  search: string = '';
  first: number = 0;
  rows: number = 4;
  totalRecords: number;
  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  @ViewChild('b') button: ElementRef;
  @ViewChild('paginator') paginator: Paginator;
  loading: boolean = false;

  constructor(private workoutServiceService: WorkoutServiceService, private commonServiceService: CommonServiceService, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.workoutServiceService.selectedExerciseId = 0;
    this.workoutServiceService.openExerciseInfo = false;

    this.filterWorkouts();
  }

  filterWorkouts(fromSearch?) {
    this.loading = true;
    if (fromSearch) {
      this.first = 0;
    }
    this.workoutServiceService.getTrainersWorkouts(this.search, this.first, this.rows).subscribe({
      next: (response) => {
        this.workouts = response.workoutList;
        this.totalRecords = response.totalRecords;
        this.selectedWorkout = this.workouts[0];
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  onPageChange(event) {
    this.first = event.first;
    this.filterWorkouts();
  }

  getCommonService() {
    return this.commonServiceService;
  }

  changePaginator(event) {
    this.paginator.changePageToFirst(event);
  }

  openExerciseInfo(exerciseId: number) {
    this.workoutServiceService.selectedExerciseId = exerciseId;
    this.workoutServiceService.openExerciseInfo = true;
  }

  subscribeToWorkout() {
    this.workoutServiceService.subscribeToWorkout(this.selectedWorkout.workoutId).subscribe({
      next: (response) => {
        this.commonServiceService.handleSuccess(response.message);
        this.filterWorkouts();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  isSubscribed() {
    return this.selectedWorkout.users.find(user => user.username.toLowerCase() == this.commonServiceService.getUsername().toLowerCase()) != undefined;
  }

  unsubscribeFromWorkout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to unsubscribe from this workout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.workoutServiceService.unsubscribeFromWorkout(this.selectedWorkout.workoutId).subscribe({
          next: (response) => {
            this.commonServiceService.handleSuccess(response.message);
            this.workouts = [];
            this.selectedWorkout = new WorkoutVO();
            this.filterWorkouts();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

}
