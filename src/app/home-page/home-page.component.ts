import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestVO } from '../VO/TestVO';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  result : TestVO[] | any = [];

  result2 : String = "Before";

  constructor(private http : HttpClient){

  }

  testing() {
    this.http.get('http://localhost:9090/main').subscribe(data => {
      this.result = data;
    }, error => { console.log(error) });

  }

  test() {
    this.http.get('http://localhost:9090/test').subscribe(data => {
      console.log(data);
    }, error => { console.log(error) });

  }

}
