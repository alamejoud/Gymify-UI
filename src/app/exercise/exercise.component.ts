import { Component, Input } from '@angular/core';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { MuscleVO } from '../VO/MuscleVO';
import { CommonServiceService } from '../Services/common-service.service';
import { LookupVO } from '../VO/LookupVO';
import { MessageService } from 'primeng/api';
import { ExerciseVO } from '../VO/ExerciseVO';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {

  exerciseCategories: any = [];
  exerciseGroups: LookupVO[] = [];
  selectedGroup: LookupVO;
  filteredExercises: ExerciseVO[];
  selectedExercise: ExerciseVO;
  search: string;
  constructor(private exerciseServiceService: ExerciseServiceService, private commonServiceService: CommonServiceService, private messageService: MessageService, private sanitizer: DomSanitizer, private router: Router) { }
  ngOnInit() {
    this.getExerciseGroups();
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

  getExerciseCategories(category: string) {
    this.exerciseServiceService.getExerciseCategories(category).subscribe({
      next: response => {
        this.exerciseCategories = response.exerciseCategories;
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  filterExercises($event) {
    this.search = $event.query;
    this.exerciseServiceService.filterExercises($event.query).subscribe({
      next: response => {
        this.filteredExercises = response.exerciseList;
        this.filteredExercises.forEach(exercise => {
          let highlightedText = '<span style="color: cyan; font-weight: bold;">$&</span>'
          let lowerCaseHandle: string = exercise.exerciseName.replaceAll(new RegExp($event.query.toLowerCase(), "g"), highlightedText);
          let upperCaseHandle: string = lowerCaseHandle.replaceAll(new RegExp($event.query.toUpperCase(), "g"), highlightedText)
          let capitalizeHandle: string = upperCaseHandle.replaceAll(new RegExp(this.titleCaseWord($event.query), "g"), highlightedText)
          exercise.exerciseSafeHtml = this.sanitizer.bypassSecurityTrustHtml(capitalizeHandle);
        });
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  getObject() {
    return Object;
  }

  getCommonService() {
    return this.commonServiceService;
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  searchForExercises(searchValue) {
    this.router.navigate(['/homePage/exercises', 'search', searchValue]);
  }

  print(value) {
    alert(value);
  }

  getExerciseService() {
    return this.exerciseServiceService;
  }
}
