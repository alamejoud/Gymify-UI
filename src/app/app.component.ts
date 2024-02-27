import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdleServiceService } from './Services/idle-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private route: ActivatedRoute, private idleServiceService: IdleServiceService) { }

  checkLogin(): boolean {
    let isLoggedIn = false;

    this.route.url.subscribe(url => {
      const activatedRoute = this.route.snapshot.children[0];

      if ((activatedRoute?.routeConfig?.component?.name || '') == '_LoginPageComponent') {
        isLoggedIn = true;
      }
    });

    return isLoggedIn;
  }

  getIdleService(): IdleServiceService {
    return this.idleServiceService;
  }

}
