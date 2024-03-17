import { Component } from '@angular/core';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { MuscleVO } from '../VO/MuscleVO';
import { CommonServiceService } from '../Services/common-service.service';
import { LookupVO } from '../VO/LookupVO';
import { MessageService } from 'primeng/api';
import { ExerciseVO } from '../VO/ExerciseVO';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {

  exerciseCategories: any = [];
  exerciseGroups: LookupVO[] = [];
  selectedGroup: LookupVO;
  filteredCountries: ExerciseVO[];
  selectedExercise: ExerciseVO;
  constructor(private exerciseServiceService: ExerciseServiceService, private commonServiceService: CommonServiceService, private messageService: MessageService) { }
  ngOnInit() {
    this.getExerciseGroups();
  }
  getImage(image: any) {
    return this.commonServiceService.transformImage(image);
  }

  getExerciseGroups() {
    this.exerciseServiceService.getExerciseGroups().subscribe({
      next: response => {
        this.exerciseGroups = response.exerciseGroups;
        this.selectedGroup = this.exerciseGroups[0];
        this.getExerciseCategories(this.selectedGroup.lookupCode);
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  getExerciseCategories(category: String) {
    debugger;
    this.exerciseServiceService.getExerciseCategories(category).subscribe({
      next: response => {
        this.exerciseCategories = response.exerciseCategories;
        console.log(Object.entries(this.exerciseCategories[0])[1][1]);
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  filterExercises($event) {
    this.exerciseServiceService.filterExercises($event.query).subscribe({
      next: response => {
        this.filteredCountries = response.exercises;
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  getObject() {
    return Object;
  }
}
