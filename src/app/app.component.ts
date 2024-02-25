import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private route: ActivatedRoute) { }

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

}
