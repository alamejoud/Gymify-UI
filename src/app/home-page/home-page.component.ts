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
          icon: 'pi pi-home',
          routerLink: '/homePage/home'
        },
        {
          label: 'Workout',
          icon: 'pi pi-heart',
          routerLink: '/homePage/workout'
        },
        {
          label: 'Exercises',
          icon: 'fa-solid fa-dumbbell',
          routerLink: '/homePage/exercises'
        },
        {
          label: 'Nutrition',
          icon: 'pi pi-apple'
        },
        {
          label: 'Progress',
          icon: 'pi pi-chart-line'
        },
        {
          label: 'Community',
          icon: 'pi pi-users'
        },
        {
          label: 'More',
          icon: 'pi pi-ellipsis-h'
        }
      ]
    } else if (this.userServiceService.displayedUser.role == 'trainee') {
      this.menuTab = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/homePage/home'
        },
        {
          label: 'Workout',
          icon: 'pi pi-heart',
          routerLink: '/homePage/workout'
        },
        {
          label: 'Exercises',
          icon: 'fa-solid fa-dumbbell',
          routerLink: '/homePage/exercises'
        },
        {
          label: 'Nutrition',
          icon: 'pi pi-apple'
        },
        {
          label: 'Progress',
          icon: 'pi pi-chart-line'
        },
        {
          label: 'Community',
          icon: 'pi pi-users'
        },
        {
          label: 'More',
          icon: 'pi pi-ellipsis-h'
        }
      ]
    } else if (this.userServiceService.displayedUser.role == 'trainer') {
      this.menuTab = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/homePage/home'
        },
        {
          label: 'Exercises',
          icon: 'fa-solid fa-dumbbell',
          routerLink: '/homePage/trainerExercise'
        }
      ]
    } else if (this.userServiceService.displayedUser.role == 'dietitian') {
      this.menuTab = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/homePage/home'
        }
      ]
    }
  }

  getCommonService() {
    return this.commonServiceService;
  }

}
