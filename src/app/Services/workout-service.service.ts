import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

  constructor(private http: HttpClient) { }

  getWorkoutById(id: number): Observable<any> {
    return this.http.get('http://localhost:9090/workout/getWorkoutById?workoutId=' + id);
  }
}
