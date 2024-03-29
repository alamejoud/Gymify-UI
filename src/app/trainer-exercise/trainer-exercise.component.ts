import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-trainer-exercise',
  templateUrl: './trainer-exercise.component.html',
  styleUrl: './trainer-exercise.component.css'
})
export class TrainerExerciseComponent {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.items = [
      {
        label: 'My  Created Exercises',
        icon: 'pi pi-align-right',
        routerLink: '/homePage/trainerExercise/exercises'
      },
      {
        label: 'Manage Exercises',
        icon: 'pi pi-plus-circle',
        routerLink: '/homePage/trainerExercise/manageExercises'
      }
    ];

    this.activeItem = this.items[0];

    this.route.url.subscribe(url => {
      const activatedRoute = this.route.snapshot.children[0];
    });
  }
}
