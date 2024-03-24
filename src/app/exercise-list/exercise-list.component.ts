import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseVO } from '../VO/ExerciseVO';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { MessageService } from 'primeng/api';
import { CommonServiceService } from '../Services/common-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent {

  groupId: string;
  categoryId: string;
  exerciseList: ExerciseVO[] = [];
  title: string;
  constructor(private route: ActivatedRoute, private exerciseServiceService: ExerciseServiceService, private messageService: MessageService, private commonServiceService: CommonServiceService, private location: Location) { }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.exerciseList.push(new ExerciseVO());
    }
    debugger;
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    switch (this.groupId) {
      case 'muscle':
        this.getExercisesByMuscle(this.categoryId);
        break;
      case 'equipment':
        this.getExercisesByEquipment(this.categoryId);
        break;
      case 'type':
        this.getExercisesByType(this.categoryId);
        break;
      case 'search':
        this.getExercisesBySearch(this.categoryId);
        break;
      default:
        this.getExercisesByMuscle('1');
    }
    this.getTitle();
  }

  getExercisesByMuscle(muscleId) {
    this.exerciseServiceService.getExercisesByMuscle(muscleId).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.exerciseServiceService.selectedExercise = this.exerciseList[0];
      },
      error: error => {
        console.log('Error Fetching Exercises');
      }
    });
  }

  getExercisesByEquipment(equipmentId) {
    this.exerciseServiceService.getExercisesByEquipment(equipmentId).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.exerciseServiceService.selectedExercise = this.exerciseList[0];
      },
      error: error => {
        console.log('Error Fetching Exercises');
      }
    });
  }

  getExercisesByType(typeId) {
    this.exerciseServiceService.getExercisesByType(typeId).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.exerciseServiceService.selectedExercise = this.exerciseList[0];
      },
      error: error => {
        console.log('Error Fetching Exercises');
      }
    });
  }

  getExercisesBySearch(searchText) {
    this.exerciseServiceService.getExercisesBySearch(searchText).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.exerciseServiceService.selectedExercise = this.exerciseList[0];
      },
      error: error => {
        console.log('Error Fetching Exercises');
      }
    });
  }

  getCommonService() {
    return this.commonServiceService;
  }

  selectExercise(exercise: ExerciseVO) {
    this.exerciseServiceService.selectedExercise = exercise;
  }

  getExerciseService() {
    return this.exerciseServiceService;
  }

  getTitle() {
    this.title = 'Exercises for ';
    if (this.groupId === 'muscle') {
      this.title += 'Muscle \'';
      this.exerciseServiceService.getMuscleName(this.categoryId).subscribe({
        next: data => {
          this.title += data.muscleName;
          this.title += '\'';
        },
        error: error => {
          console.log('Error Fetching Muscle Name');
        }
      });
    } else if (this.groupId === 'equipment') {
      this.title += 'Equipment \'';
      this.exerciseServiceService.getEquipmentName(this.categoryId).subscribe({
        next: data => {
          this.title += data.equipmentName;
          this.title += '\'';
        },
        error: error => {
          console.log('Error Fetching Equipment Name');
        }
      });
    }
    else if (this.groupId === 'type') {
      this.title += 'Type \'';
      this.exerciseServiceService.getTypeName(this.categoryId).subscribe({
        next: data => {
          this.title += data.typeName;
          this.title += '\'';
        },
        error: error => {
          console.log('Error Fetching Type Name');
        }
      });
    }
    else if (this.groupId === 'search') {
      this.title += 'Search \'';
      this.title += this.categoryId;
      this.title += '\'';
    }
  }

  back() {
    this.location.back();
  }
}
