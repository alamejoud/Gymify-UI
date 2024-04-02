import { Component } from '@angular/core';
import { ExerciseVO } from '../VO/ExerciseVO';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseServiceService } from '../Services/exercise-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WorkoutServiceService } from '../Services/workout-service.service';

@Component({
  selector: 'app-exercise-info',
  templateUrl: './exercise-info.component.html',
  styleUrl: './exercise-info.component.css'
})
export class ExerciseInfoComponent {

  selectedExercise: ExerciseVO = null;
  loading: boolean = false;
  addToWorkoutScreen: boolean = false;

  constructor(private route: ActivatedRoute, private exerciseServiceService: ExerciseServiceService,
    private messageService: MessageService, private commonServiceService: CommonServiceService,
    private router: Router, private userServiceService: UserServiceService,
    private confirmationService: ConfirmationService, private workoutServiceService: WorkoutServiceService) { }

  ngOnInit() {
    if (this.workoutServiceService.selectedExerciseId != 0) {
      this.loading = true;
      this.exerciseServiceService.getExerciseById(String(this.workoutServiceService.selectedExerciseId)).subscribe({
        next: (response) => {
          this.selectedExercise = response.exercise;
          this.selectedExercise.safeVideoLink = this.commonServiceService.transformUrl(this.selectedExercise.videoLink);
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        }
      });
    }
  }

  getCommonService() {
    return this.commonServiceService;
  }

}
