import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseServiceService {

  constructor(private http: HttpClient) { }

  getExerciseCategories(group: String): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseCategories?group=' + group);
  }
  getExerciseList(muscleId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseList?muscleId=' + muscleId);
  }
  getExerciseGroups(): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseGroups');
  }
  filterExercises(exerciseName: String): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/filterExercises?exerciseName=' + exerciseName);
  }
}
