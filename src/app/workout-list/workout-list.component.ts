import { Component } from '@angular/core';
import { WorkoutVO } from '../VO/WorkoutVO';
import { CommonServiceService } from '../Services/common-service.service';
import { WorkoutServiceService } from '../Services/workout-service.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent {

  myWorkouts: WorkoutVO[] = [];
  selectedWorkout: WorkoutVO = new WorkoutVO;

  constructor(private commonServiceService: CommonServiceService, private workoutServiceService: WorkoutServiceService, private confirmationService: ConfirmationService, private router: Router) {

  }

  ngOnInit() {
    this.getMyWorkouts();
  }

  getCommonService() {
    return this.commonServiceService;
  }

  getMyWorkouts() {
    debugger;
    this.workoutServiceService.getMyWorkouts().subscribe({
      next: (response) => {
        this.myWorkouts = response.workoutList;
        this.selectedWorkout = this.myWorkouts[0];
        console.log(this.selectedWorkout);
      },
      error: (error) => {
        console.log(error);
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
}
