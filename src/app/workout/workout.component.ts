import { Component } from '@angular/core';
import { WorkoutServiceService } from '../Services/workout-service.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {

  constructor(private workoutServiceService: WorkoutServiceService) { }

  ngOnInit() {
  }

}
