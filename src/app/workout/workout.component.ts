import { Component, ElementRef, ViewChild } from '@angular/core';
import { WorkoutServiceService } from '../Services/workout-service.service';
import { ExerciseVO } from '../VO/ExerciseVO';
import { WorkoutVO } from '../VO/WorkoutVO';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { WorkoutExerciseVO } from '../VO/WorkoutExerciseVO';
import { CommonServiceService } from '../Services/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Button } from 'primeng/button';
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
  namePopup: boolean = false;
  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  tempWorkout: WorkoutVO;
  @ViewChild('b') button: ElementRef;
  @ViewChild('paginator') paginator: Paginator;
  workoutId: number = 0;

  constructor(private workoutServiceService: WorkoutServiceService, private exerciseServiceService: ExerciseServiceService, private commonServiceService: CommonServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.filterExercises();

    this.workoutId = Number(this.route.snapshot.paramMap.get('workoutId'));
    if (this.workoutId) {
      this.workoutServiceService.getWorkoutById(this.workoutId).subscribe({
        next: response => {
          this.workout = response.workout;
          this.tempWorkout = { ...this.workout };
        },
        error: error => {
          this.commonServiceService.handleError(error);
        }
      });
    } else {
      this.tempWorkout = { ...this.workout };
    }
  }

  ngAfterViewInit() {
    console.log(this.paginator);

    console.log(this.button);
  }

  dragStart(exercise, event) {
    this.draggedExercise = exercise;
    this.draggedFrom = event.target.parentElement.id;

  }

  dragEnd() {
    this.draggedExercise = null;
  }

  drop(event) {
    this.droppedInto = (event.target.querySelector('ul')?.id || event.target.parentElement.querySelector('ul')?.id || event.target.parentElement.parentElement.querySelector('ul')?.id
      || event.target.parentElement.parentElement.parentElement.querySelector('ul')?.id || event.target.parentElement.parentElement.parentElement.parentElement.querySelector('ul')?.id);

    if (this.draggedExercise && !this.workout[this.droppedInto + 'Exercises'].map(exercise => exercise.exerciseId).includes(this.draggedExercise.exerciseId)) {
      let exercise = this.draggedExercise;
      let workoutExercise = new WorkoutExerciseVO();
      workoutExercise.exercise = exercise;
      workoutExercise.exerciseId = exercise.exerciseId;
      workoutExercise.workout = this.workout;
      workoutExercise.workoutId = this.workout.workoutId;
      workoutExercise.day = this.days.indexOf(this.droppedInto) + 1;
      this.workout[this.droppedInto + 'Exercises'].push(workoutExercise);
      this.draggedExercise = null;
    }

  }

  filterExercises(fromSearch?) {
    if (fromSearch) {
      this.first = 0;
    }
    this.exerciseServiceService.getExercisesBySearch(this.search, this.first, this.rows).subscribe({
      next: response => {
        if (fromSearch) {
          this.button.nativeElement.click();
        }
        this.totalRecords = response.exerciseListSize;
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
    this.workout[event.target?.parentElement.parentElement.parentElement.id + 'Exercises'].splice(this.workout[event.target?.parentElement.parentElement.parentElement.id + 'Exercises'].indexOf(exercise), 1);
  }

  scheduleIsNotEmpty() {
    return (this.workout.mondayExercises && this.workout.mondayExercises.length > 0)
      || (this.workout.tuesdayExercises && this.workout.tuesdayExercises.length > 0)
      || (this.workout.wednesdayExercises && this.workout.wednesdayExercises.length > 0)
      || (this.workout.thursdayExercises && this.workout.thursdayExercises.length > 0)
      || (this.workout.fridayExercises && this.workout.fridayExercises.length > 0)
      || (this.workout.saturdayExercises && this.workout.saturdayExercises.length > 0)
      || (this.workout.sundayExercises && this.workout.sundayExercises.length > 0);
  }

  showNamePopup() {
    this.namePopup = true;
  }

  saveWorkout() {
    let modifiedWorkout: WorkoutVO = { ...this.workout };
    ;
    this.days.forEach(day => {
      modifiedWorkout[day + 'Exercises'].forEach((workoutExercise) => {
        delete workoutExercise.workout;
      });
    });
    delete modifiedWorkout.createdBy;
    this.workoutServiceService.saveWorkout(modifiedWorkout).subscribe({
      next: response => {
        this.commonServiceService.handleSuccess(response.message);
        this.namePopup = false;
        if (!this.workoutId || this.workoutId === 0) {
          this.workout = new WorkoutVO();
        }
      },
      error: error => {
        this.commonServiceService.handleError(error);
        console.log(error);
      }
    });
  }

  changePaginator(event) {
    this.paginator.changePageToFirst(event);
  }

}
