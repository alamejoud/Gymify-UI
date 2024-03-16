import { Component } from '@angular/core';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { MuscleVO } from '../VO/MuscleVO';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {
  exerciseMuscles: MuscleVO[] = [];
  constructor(private exerciseServiceService: ExerciseServiceService, private commonServiceService: CommonServiceService) { }
  ngOnInit() {
    this.exerciseServiceService.getExerciseMuscles().subscribe({
      next: response => {
        this.exerciseMuscles = response.exerciseMuscles;
        console.log(this.exerciseMuscles);
      },
      error: error => console.log(error)
    });
  }
  getImage(image: any) {
    return this.commonServiceService.transformImage(image);
  }
}
