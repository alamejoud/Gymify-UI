import { Component } from '@angular/core';
import { IdleServiceService } from '../Services/idle-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { MenuItem } from 'primeng/api';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  menuTab: MenuItem[];

  constructor(private idleServiceService: IdleServiceService, private commonServiceService: CommonServiceService) { }

  ngOnInit(): void {

    if (typeof window !== 'undefined' && localStorage?.getItem('token') != null) {
      this.idleServiceService.startIdleTimer();
    }

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

  }

  getCommonService() {
    return this.commonServiceService;
  }

}
