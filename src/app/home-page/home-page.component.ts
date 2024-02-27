import { Component } from '@angular/core';
import { IdleServiceService } from '../Services/idle-service.service';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private idleServiceService: IdleServiceService) { }

  ngOnInit(): void {


    if (sessionStorage?.getItem('username') != null) {
      this.idleServiceService.startIdleTimer();
    }
  }

}
