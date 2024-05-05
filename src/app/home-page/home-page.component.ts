import { Component } from '@angular/core';
import { IdleServiceService } from '../Services/idle-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { MenuItem } from 'primeng/api';
import { CommonServiceService } from '../Services/common-service.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  menuTab: MenuItem[];

  constructor(private idleServiceService: IdleServiceService, private commonServiceService: CommonServiceService, private userServiceService: UserServiceService) { }

  async ngOnInit() {

    if (typeof window !== 'undefined' && localStorage?.getItem('token') != null) {
      this.idleServiceService.startIdleTimer();
    }

    if (!this.userServiceService.displayedUser || !this.userServiceService.displayedUser.userId || this.userServiceService.displayedUser.userId == 0) {
      let response = await firstValueFrom(this.userServiceService.getLoggedInUser());
      this.userServiceService.displayedUser = response.user;
      this.userServiceService.imageUrl = this.commonServiceService.transformImage(this.userServiceService.displayedUser.profilePicture);
    }
    this.initializeMenu();
  }

  initializeMenu() {
    if (this.userServiceService.displayedUser.role == 'admin') {

      this.menuTab = [
        {
          label: 'Home',
          icon: 'fa-solid fa-house',
          routerLink: '/homePage/home',
          command: () => { this.navigate() }
        },
        {
          label: 'Workout',
          icon: 'fa-regular fa-calendar',
          routerLink: '/homePage/workout',
          command: () => { this.navigate() }
        },
        {
          label: 'Exercises',
          icon: 'fa-solid fa-dumbbell',
          routerLink: '/homePage/trainerExercise',
          command: () => { this.navigate() }
        },
        {
          label: 'Nutrition',
          icon: 'fa-solid fa-apple-whole',
          routerLink: '/homePage/nutrition',
          command: () => { this.navigate() }
        }
      ]
    } else if (this.userServiceService.displayedUser.role == 'trainee') {
      this.menuTab = [
        {
          label: 'Home',
          icon: 'fa-solid fa-house',
          routerLink: '/homePage/home',
          command: () => { this.navigate() }
        },
        {
          label: 'Workouts',
          icon: 'fa-regular fa-calendar',
          routerLink: '/homePage/workout',
          command: () => { this.navigate() }
        },
        {
          label: 'Exercises',
          icon: 'fa-solid fa-dumbbell',
          routerLink: '/homePage/exercises',
          command: () => { this.navigate() }
        },
        {
          label: 'Nutrition',
          icon: 'fa-solid fa-apple-whole',
          routerLink: '/homePage/nutrition',
          command: () => { this.navigate() }
        }
      ]
    } else if (this.userServiceService.displayedUser.role == 'trainer') {
      this.menuTab = [
        {
          label: 'Home',
          icon: 'fa-solid fa-house',
          routerLink: '/homePage/home',
          command: () => { this.navigate() }
        },
        {
          label: 'Workouts',
          icon: 'fa-regular fa-calendar',
          routerLink: '/homePage/workout',
          command: () => { this.navigate() }
        },
        {
          label: 'Exercises',
          icon: 'fa-solid fa-dumbbell',
          routerLink: '/homePage/trainerExercise',
          command: () => { this.navigate() }
        }
      ]
    } else if (this.userServiceService.displayedUser.role == 'dietitian') {
      this.menuTab = [
        {
          label: 'Home',
          icon: 'fa-solid fa-house',
          routerLink: '/homePage/home',
          command: () => { this.navigate() }
        },
        {
          label: 'Nutrition',
          icon: 'fa-solid fa-apple-whole',
          routerLink: '/homePage/nutrition',
          command: () => { this.navigate() }
        }
      ]
    }
  }

  getCommonService() {
    return this.commonServiceService;
  }

  navigate() {
    this.commonServiceService.updateTitle();
    this.commonServiceService.toggleMenu = false;
  }

}
