import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseVO } from '../VO/ExerciseVO';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonServiceService } from '../Services/common-service.service';
import { Location } from '@angular/common';
import { UserServiceService } from '../Services/user-service.service';

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
  loading: boolean = false;
  addToWorkoutScreen: boolean = false;

  constructor(private route: ActivatedRoute, private exerciseServiceService: ExerciseServiceService,
    private messageService: MessageService, private commonServiceService: CommonServiceService,
    private router: Router, private userServiceService: UserServiceService,
    private confirmationService: ConfirmationService) { }

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
    this.loading = true;
    this.exerciseServiceService.getExercisesByMuscle(muscleId, this.first, this.rows).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.selectedExercise = this.exerciseList[0] || undefined;
        this.exerciseList.forEach(element => {
          element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
        });
        this.loading = false;
      },
      error: error => {
        this.exerciseList = [];
        this.selectedExercise = undefined;
        this.loading = false;
      }
    });
  }

  getExercisesByEquipment(equipmentId) {
    this.loading = true;
    this.exerciseServiceService.getExercisesByEquipment(equipmentId, this.first, this.rows).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.selectedExercise = this.exerciseList[0] || undefined;
        this.exerciseList.forEach(element => {
          element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
        });
        this.loading = false;
      },
      error: error => {
        this.exerciseList = [];
        this.selectedExercise = undefined;
        this.loading = false;
      }
    });
  }

  getExercisesByType(typeId) {
    this.loading = true;
    this.exerciseServiceService.getExercisesByType(typeId, this.first, this.rows).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.selectedExercise = this.exerciseList[0] || undefined;
        this.exerciseList.forEach(element => {
          element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
        });
        this.loading = false;
      },
      error: error => {
        this.exerciseList = [];
        this.selectedExercise = undefined;
        this.loading = false;
      }
    });
  }

  getExercisesBySearch(searchText) {
    this.loading = true;
    this.exerciseServiceService.getExercisesBySearch(searchText, this.first, this.rows).subscribe({
      next: data => {
        this.exerciseList = data.exerciseList;
        this.exerciseList.forEach(element => {
          element.safeVideoLink = this.commonServiceService.transformUrl(element.videoLink);
        });
        if (this.exerciseServiceService.autoCompleteSelectedExerciseId != 0) {
          this.selectedExercise = this.exerciseList.find(exercise => exercise.exerciseId === this.exerciseServiceService.autoCompleteSelectedExerciseId) || undefined;
          this.exerciseServiceService.autoCompleteSelectedExerciseId = 0;
        }
        else {
          this.selectedExercise = this.exerciseList[0];
        }
        this.loading = false;
      },
      error: error => {
        this.exerciseList = [];
        this.selectedExercise = undefined;
        this.loading = false;
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
    if (this.userServiceService.displayedUser.role === 'trainer') {
      this.router.navigate(['/homePage/trainerExercise/exercises']);
    } else {
      this.router.navigate(['/homePage/exercises']);
    }
  }

  onPageChange(event) {
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

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this exercise?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.deleteExercise();
      }
    });
  }

  deleteExercise() {
    this.exerciseServiceService.deleteExercise(this.selectedExercise.exerciseId).subscribe({
      next: response => {
        this.commonServiceService.handleSuccess(response.message);
        this.first = 0;
        if (this.groupId === 'muscle') {
          this.getExercisesByMuscle(this.categoryId);
        } else if (this.groupId === 'equipment') {
          this.getExercisesByEquipment(this.categoryId);
        } else if (this.groupId === 'type') {
          this.getExercisesByType(this.categoryId);
        } else if (this.groupId === 'search') {
          this.getExercisesBySearch(this.categoryId);
        } else {
          this.getExercisesByMuscle('1');
        }
        this.getTotalRecords();
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  isTrainer(): boolean {
    return this.router.url.includes('trainerExercise');
  }

  editExercise() {
    this.router.navigate(['/homePage/trainerExercise/manageExercises/' + this.selectedExercise.exerciseId]);
  }

  openAddToWorkoutScreen() {
    console.log(1);

    this.addToWorkoutScreen = true;
  }

}
