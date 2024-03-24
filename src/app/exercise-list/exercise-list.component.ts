import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedExercise: ExerciseVO = null;
  first: number = 0;
  rows: number = 4;
  totalRecords = 0;

  constructor(private route: ActivatedRoute, private exerciseServiceService: ExerciseServiceService, private messageService: MessageService, private commonServiceService: CommonServiceService, private router: Router) { }

  ngOnInit() {
    for (let i = 0; i < 4; i++) {
      this.exerciseList.push(new ExerciseVO());
    }
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
    this.getTotalRecords();
    this.getTitle();
  }

  getExercisesByMuscle(muscleId) {
    this.exerciseServiceService.getExercisesByMuscle(muscleId, this.first, this.rows).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.selectedExercise = this.exerciseList[0];
        this.exerciseList.forEach(element => {
          element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
        });
      },
      error: error => {
        console.log('Error Fetching Exercises');
      }
    });
  }

  getExercisesByEquipment(equipmentId) {
    this.exerciseServiceService.getExercisesByEquipment(equipmentId, this.first, this.rows).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.selectedExercise = this.exerciseList[0];
        this.exerciseList.forEach(element => {
          element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
        });
      },
      error: error => {
        console.log('Error Fetching Exercises');
      }
    });
  }

  getExercisesByType(typeId) {
    this.exerciseServiceService.getExercisesByType(typeId, this.first, this.rows).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.selectedExercise = this.exerciseList[0];
        this.exerciseList.forEach(element => {
          element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
        });
      },
      error: error => {
        console.log('Error Fetching Exercises');
      }
    });
  }

  getExercisesBySearch(searchText) {
    this.exerciseServiceService.getExercisesBySearch(searchText, this.first, this.rows).subscribe({
      next: data => {
        debugger;
        this.exerciseList = data.exerciseList;
        if (this.exerciseServiceService.autoCompleteSelectedExerciseId != 0) {
          this.selectedExercise = this.exerciseList.find(exercise => exercise.exerciseId === this.exerciseServiceService.autoCompleteSelectedExerciseId);
          this.exerciseServiceService.autoCompleteSelectedExerciseId = 0;
          this.exerciseList.forEach(element => {
            element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
          });
        }
        else {
          this.selectedExercise = this.exerciseList[0];
        }
      },
      error: error => {
        console.log('Error Fetching Exercises');
      }
    });
  }

  getCommonService() {
    return this.commonServiceService;
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
    this.router.navigate(['/homePage/exercises']);
  }

  onPageChange(event) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
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

  }

  getTotalRecords() {
    this.exerciseServiceService.getExerciseCount(this.groupId, this.categoryId).subscribe({
      next: data => {
        this.totalRecords = data.exerciseCount;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }
}
