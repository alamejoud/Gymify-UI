import { Component } from '@angular/core';
import { WorkoutServiceService } from '../Services/workout-service.service';
import { ExerciseVO } from '../VO/ExerciseVO';
import { WorkoutVO } from '../VO/WorkoutVO';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { WorkoutExerciseVO } from '../VO/WorkoutExerciseVO';
import { CommonServiceService } from '../Services/common-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {

  exercises: ExerciseVO[];
  workout: WorkoutVO = new WorkoutVO();
  draggedExercise: any;
  draggedFrom: string;
  droppedInto: string;
  search: string = '';
  first: number = 0;
  rows: number = 4;
  totalRecords: number;

  constructor(private workoutServiceService: WorkoutServiceService, private exerciseServiceService: ExerciseServiceService, private commonServiceService: CommonServiceService, private router: Router) { }

  ngOnInit() {
    this.filterExercises();
    this.exerciseServiceService.getExerciseCount('search', '').subscribe({
      next: (value) => {
        this.totalRecords = value.exerciseCount;
      }
    });
  }

  dragStart(exercise, event) {
    this.draggedExercise = exercise;
    this.draggedFrom = event.target.parentElement.id;

  }

  dragEnd() {
    this.draggedExercise = null;
  }

  drop(event) {
    this.droppedInto = event.target.querySelector('ul')?.id;

    if (this.draggedExercise && !this.workout[this.droppedInto + 'Exercises'].map(exercise => exercise.exerciseId).includes(this.draggedExercise.exerciseId)) {
      if (this.draggedFrom !== 'list') {
        this.workout[this.draggedFrom + 'Exercises'].splice(this.workout[this.draggedFrom + 'Exercises'].indexOf(this.draggedExercise), 1);
      }
      let exercise = this.draggedExercise;
      let workoutExercise = new WorkoutExerciseVO();
      workoutExercise.exercise = exercise;
      workoutExercise.exerciseId = exercise.exerciseId;
      workoutExercise.workout = this.workout;
      workoutExercise.workoutId = this.workout.workoutId;
      this.workout[this.droppedInto + 'Exercises'].push(workoutExercise);
      this.draggedExercise = null;
    }

  }

  filterExercises() {
    this.exerciseServiceService.getExercisesBySearch(this.search, this.first, this.rows).subscribe({
      next: response => {
        this.exercises = response.exerciseList;
        this.exercises.forEach(element => {
          element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
        });
      },
      error: error => {
        this.exercises = [];
      }
    });
  }

  onPageChange(event) {
    this.first = event.first;
    this.filterExercises();
  }

  isTrainer(): boolean {
    return this.router.url.includes('trainerExercise');
  }

  getCommonService() {
    return this.commonServiceService;
  }

  removeExercise(exercise, event) {
    console.log(exercise);
    console.log(event.target?.parentElement.parentElement.parentElement.id);

    this.workout[event.target?.parentElement.parentElement.parentElement.id + 'Exercises'].splice(this.workout[event.target?.parentElement.parentElement.parentElement.id + 'Exercises'].indexOf(exercise), 1);

  }

}
