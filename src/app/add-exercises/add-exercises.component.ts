import { Component } from '@angular/core';
import { MuscleVO } from '../VO/MuscleVO';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { EquipmentVO } from '../VO/EquipmentVO';
import { TypeVO } from '../VO/TypeVO';
import { ExerciseVO } from '../VO/ExerciseVO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-exercises',
  templateUrl: './add-exercises.component.html',
  styleUrl: './add-exercises.component.css'
})
export class AddExercisesComponent {

  filteredMajorMuscles: MuscleVO[];
  filteredEquipments: EquipmentVO[];
  filteredTypes: TypeVO[];
  filteredMinorMuscles: MuscleVO[];

  exercise: ExerciseVO = new ExerciseVO();
  tempExercise = new ExerciseVO();

  title = '';

  constructor(private exerciseServiceService: ExerciseServiceService, private commonServiceService: CommonServiceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    let exerciseId = this.route.snapshot.paramMap.get('exerciseId');
    if (exerciseId != null && exerciseId != '') {
      this.exerciseServiceService.getExerciseById(exerciseId).subscribe({
        next: response => {
          this.exercise = response.exercise;
          this.exercise.videoLink = this.exercise.videoLink.substring(this.exercise.videoLink.lastIndexOf('/') + 1);
          this.tempExercise = JSON.parse(JSON.stringify(this.exercise));
          this.title = 'Edit Exercise';
        },
        error: error => {
          this.commonServiceService.handleError(error);
        }
      });
    } else {
      this.title = 'Add Exercise';
    }
  }

  filterMajorMuscles($event) {
    this.exerciseServiceService.filterMuscles($event.query).subscribe({
      next: response => {
        this.filteredMajorMuscles = response.muscleList;
        this.filterMajorMuscles

      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  filterEquipments($event) {
    this.exerciseServiceService.filterEquipments($event.query).subscribe({
      next: response => {
        this.filteredEquipments = response.equipmentList.filter(item => !this.exercise.equipments.map(item => item.equipmentId).includes(item.equipmentId));

      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  filterTypes($event) {
    this.exerciseServiceService.filterTypes($event.query).subscribe({
      next: response => {
        this.filteredTypes = response.typeList.filter(item => !this.exercise.types.map(item => item.typeId).includes(item.typeId));

      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  filterMinorMuscles($event) {
    debugger;
    this.exerciseServiceService.filterMuscles($event.query).subscribe({
      next: response => {

        this.filteredMinorMuscles = response.muscleList.filter(item => !this.exercise.minorMuscles.map(item => item.muscleId).includes(item.muscleId));

      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  getCommonService() {
    return this.commonServiceService;
  }

  getExerciseService() {
    return this.exerciseServiceService;
  }

  cancel() {
    this.exercise = JSON.parse(JSON.stringify(this.tempExercise));
  }

  checkFields() {
    return !this.exercise.exerciseName || this.exercise.exerciseName.trim() == '' || !this.exercise.majorMuscle || !this.exercise.equipments || this.exercise.equipments.length == 0 || !this.exercise.types || this.exercise.types.length == 0 || !this.exercise.videoLink || this.exercise.videoLink.trim() == '';
  }

  save() {
    this.exerciseServiceService.saveExercise(this.exercise).subscribe({
      next: response => {
        this.commonServiceService.handleSuccess(response.message);
        if (this.tempExercise.exerciseId == null) {
          this.exercise = new ExerciseVO();
        } else {
          this.tempExercise = JSON.parse(JSON.stringify(this.exercise));
        }
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }
}
