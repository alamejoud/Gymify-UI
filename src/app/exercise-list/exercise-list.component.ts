import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseVO } from '../VO/ExerciseVO';
import { ExerciseServiceService } from '../Services/exercise-service.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent {

  muscleId: string;
  exerciseList: ExerciseVO[];
  constructor(private route: ActivatedRoute, private exerciseServiceService: ExerciseServiceService) { }

  ngOnInit() {
    this.muscleId = this.route.snapshot.paramMap.get('muscleId');
    this.exerciseServiceService.getExerciseList(this.muscleId).subscribe((data: ExerciseVO[]) => {
      this.exerciseList = data;
      console.log(this.exerciseList);

    });
  }

}
