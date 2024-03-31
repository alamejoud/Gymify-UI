import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrl: './workout-page.component.css'
})
export class WorkoutPageComponent {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
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

    this.activeItem = this.items[0];

    this.route.url.subscribe(url => {
      const activatedRoute = this.route.snapshot.children[0];
    });
  }
}
