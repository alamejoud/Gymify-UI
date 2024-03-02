import { Component } from '@angular/core';
import { IdleServiceService } from '../Services/idle-service.service';
import { UserServiceService } from '../Services/user-service.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  profileDialogVisible: any = false;

  menuTab: MenuItem[];

  constructor(private idleServiceService: IdleServiceService) { }

  ngOnInit(): void {

    if (sessionStorage?.getItem('username') != null) {
      this.idleServiceService.startIdleTimer();
    }

    this.menuTab = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Workout',
        icon: 'pi pi-heart',
        items: [
          {
            label: 'My Workouts',
            icon: 'pi pi-book'
          },
          {
            label: 'Create Workout',
            icon: 'pi pi-plus'
          },
          {
            label: 'Workout Plans',
            icon: 'pi pi-list'
          }
        ]
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

  showProfileDialog(value: any) {
    this.profileDialogVisible = value;
  }

}
