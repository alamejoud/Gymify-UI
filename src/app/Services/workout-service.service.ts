import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutVO } from '../VO/WorkoutVO';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

  openExerciseInfo: boolean = false;
  selectedExerciseId: number = 0;

  constructor(private http: HttpClient) { }

  getWorkoutById(id: number): Observable<any> {
    return this.http.get('http://localhost:9090/workout/getWorkoutById?workoutId=' + id);
  }
  saveWorkout(workout: WorkoutVO): Observable<any> {
    return this.http.post('http://localhost:9090/workout/saveWorkout', workout);
  }
  getMyWorkouts(onlyCreatedWorkout: boolean): Observable<any> {
    return this.http.get('http://localhost:9090/workout/getMyWorkouts?onlyCreatedWorkout=' + onlyCreatedWorkout);
  }
  deleteWorkout(workoutId: number): Observable<any> {
    return this.http.delete('http://localhost:9090/workout/deleteWorkout?workoutId=' + workoutId);
  }
  getTrainersWorkouts(search: string, first: number, rows: number): Observable<any> {
    return this.http.get('http://localhost:9090/workout/getTrainersWorkouts?search=' + search + '&first=' + first + '&rows=' + rows);
  }
  subscribeToWorkout(workoutId: number): Observable<any> {
    return this.http.get('http://localhost:9090/workout/subscribeToWorkout?workoutId=' + workoutId);
  }
  unsubscribeFromWorkout(workoutId: number): Observable<any> {
    return this.http.get('http://localhost:9090/workout/unsubscribeFromWorkout?workoutId=' + workoutId);
  }
}
