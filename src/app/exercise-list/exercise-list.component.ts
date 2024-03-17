import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseVO } from '../VO/ExerciseVO';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { MessageService } from 'primeng/api';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent {

  muscleId: string;
  exerciseList: ExerciseVO[];
  constructor(private route: ActivatedRoute, private exerciseServiceService: ExerciseServiceService, private messageService: MessageService, private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.muscleId = this.route.snapshot.paramMap.get('muscleId');
    this.exerciseServiceService.getExerciseList(this.muscleId).subscribe(
      {
        next: (response) => {
          this.exerciseList = response.exerciseList;
          console.log(response);
        },
        error: (error) => {
          this.commonServiceService.handleError(error);
        }
      });
  }

}
