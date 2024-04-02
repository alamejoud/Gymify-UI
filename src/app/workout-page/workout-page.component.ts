import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { WorkoutServiceService } from '../Services/workout-service.service';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrl: './workout-page.component.css'
})
export class WorkoutPageComponent {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private route: ActivatedRoute, private workoutServiceService: WorkoutServiceService, private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.workoutServiceService.selectedExerciseId = 0;
    this.workoutServiceService.openExerciseInfo = false;

    if (this.commonServiceService.getRole() == 'trainer') {
      this.items = [
        {
          label: 'My Workouts',
          icon: 'pi pi-align-right',
          routerLink: '/homePage/workout/workoutList'
        },
        {
          label: 'Manage Workouts',
          icon: 'pi pi-plus',
          routerLink: '/homePage/workout/manageWorkout'
        }
      ];
    } else {
      this.items = [
        {
          label: 'My Workouts',
          icon: 'pi pi-align-right',
          routerLink: '/homePage/workout/workoutList'
        },
        {
          label: 'Manage Workouts',
          icon: 'pi pi-plus',
          routerLink: '/homePage/workout/manageWorkout'
        },
        {
          label: 'Browse Workouts',
          icon: 'pi pi-search',
          routerLink: '/homePage/workout/browseWorkout'
        }
      ];
    }

    this.activeItem = this.items[0];
  }

  getWorkoutService() {
    return this.workoutServiceService;
  }
}
