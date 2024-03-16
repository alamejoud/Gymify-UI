import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseServiceService {

  constructor(private http: HttpClient) { }

  getExerciseMuscles(): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseMuscles?token=' + localStorage.getItem('token'));
  }
  getExerciseList(muscleId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseList?muscleId=' + muscleId + '&token=' + localStorage.getItem('token'));
  }
}
