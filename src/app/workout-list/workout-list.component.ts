import { Component, Input, booleanAttribute } from '@angular/core';
import { WorkoutVO } from '../VO/WorkoutVO';
import { CommonServiceService } from '../Services/common-service.service';
import { WorkoutServiceService } from '../Services/workout-service.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { ExerciseVO } from '../VO/ExerciseVO';
import { WorkoutExerciseVO } from '../VO/WorkoutExerciseVO';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent {

  myWorkouts: WorkoutVO[] = [];
  selectedWorkout: WorkoutVO = new WorkoutVO;
  @Input() exercise: any = new ExerciseVO;
  selectedDays: string[] = [];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  loading: boolean = false;

  constructor(private commonServiceService: CommonServiceService, private workoutServiceService: WorkoutServiceService, private confirmationService: ConfirmationService, private router: Router, private exerciseServiceService: ExerciseServiceService) {

  }

  ngOnInit() {
    this.workoutServiceService.selectedExerciseId = 0;
    this.workoutServiceService.openExerciseInfo = false;

    this.getMyWorkouts();
  }

  getCommonService() {
    return this.commonServiceService;
  }

  getMyWorkouts() {
    this.loading = true;
    this.workoutServiceService.getMyWorkouts(this.exercise?.exerciseId != undefined && this.exercise?.exerciseId != 0).subscribe({
      next: (response) => {
        this.myWorkouts = response.workoutList;
        this.selectedWorkout = this.myWorkouts[0];
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this workout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.deleteExercise();
      }
    });
  }

  deleteExercise() {
    this.workoutServiceService.deleteWorkout(this.selectedWorkout.workoutId).subscribe({
      next: response => {
        this.commonServiceService.handleSuccess(response.message);
        this.getMyWorkouts();
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  editWorkout(workoutId) {
    this.router.navigate(['/homePage/workout/manageWorkout/' + workoutId]);
  }

  toggleDay(day) {
    if (this.exercise?.exerciseId != undefined && this.exercise?.exerciseId != 0) {
      if (this.selectedDays.includes(day.innerText)) {
        this.selectedDays = this.selectedDays.filter(selectedDay => selectedDay !== day.innerText);
      } else {
        this.selectedDays.push(day.innerText);
      }
    }
  }

  saveWorkout() {
    let success = true;
    this.selectedDays.forEach(day => {
      if (this.selectedWorkout[day.toLowerCase() + 'Exercises'].find(exercise => exercise.exerciseId === this.exercise.exerciseId)) {
        success = false;
      }
    });
    if (success) {
      this.selectedDays.forEach(day => {
        let workoutExercise = new WorkoutExerciseVO();
        workoutExercise.exerciseId = this.exercise.exerciseId;
        workoutExercise.exercise = this.exercise;
        workoutExercise.day = this.days.indexOf(day) + 1;
        this.selectedWorkout[day.toLowerCase() + 'Exercises'].push(workoutExercise);
      });
      this.workoutServiceService.saveWorkout(this.selectedWorkout).subscribe({
        next: response => {
          this.commonServiceService.handleSuccess(response.message);
        },
        error: error => {
          this.commonServiceService.handleError(error);
        }
      });
    } else {
      this.commonServiceService.handleError({ 'error': { 'message': 'Some of the days you selected already have this exercise' } });
    }
  }

  openExerciseInfo(exerciseId: number) {
    this.workoutServiceService.selectedExerciseId = exerciseId;
    this.workoutServiceService.openExerciseInfo = true;
  }

  unsubscribeFromWorkout(workoutId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to unsubscribe from this workout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.workoutServiceService.unsubscribeFromWorkout(workoutId).subscribe({
          next: (response) => {
            this.commonServiceService.handleSuccess(response.message);
            this.myWorkouts = [];
            this.selectedWorkout = new WorkoutVO;
            this.getMyWorkouts();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

}
