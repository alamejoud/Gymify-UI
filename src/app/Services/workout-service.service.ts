import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutVO } from '../VO/WorkoutVO';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

  constructor(private http: HttpClient) { }

  getWorkoutById(id: number): Observable<any> {
    return this.http.get('http://localhost:9090/workout/getWorkoutById?workoutId=' + id);
  }
  saveWorkout(workout: WorkoutVO): Observable<any> {
    return this.http.post('http://localhost:9090/workout/saveWorkout', workout);
  }
  getMyWorkouts(): Observable<any> {
    return this.http.get('http://localhost:9090/workout/getMyWorkouts');
  }
  deleteWorkout(workoutId: number): Observable<any> {
    return this.http.delete('http://localhost:9090/workout/deleteWorkout?workoutId=' + workoutId);
  }
}
