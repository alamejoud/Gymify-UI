import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseVO } from '../VO/ExerciseVO';

@Injectable({
  providedIn: 'root'
})
export class ExerciseServiceService {

  selectedExercise: ExerciseVO;

  constructor(private http: HttpClient) { }

  getExerciseCategories(group: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseCategories?group=' + group);
  }
  getExercisesByMuscle(muscleId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExercisesByMuscle?muscleId=' + muscleId);
  }
  getExercisesByEquipment(equipmentId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExercisesByEquipment?equipmentId=' + equipmentId);
  }
  getExercisesByType(typeId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExercisesByType?typeId=' + typeId);
  }
  getExercisesBySearch(search: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExercisesBySearch?search=' + search);
  }
  getExerciseGroups(): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseGroups');
  }
  filterExercises(exerciseName: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/filterExercises?exerciseName=' + exerciseName);
  }
  getMuscleName(muscleId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getMuscleName?muscleId=' + muscleId);
  }
  getEquipmentName(equipmentId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getEquipmentName?equipmentId=' + equipmentId);
  }
  getTypeName(typeId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getTypeName?typeId=' + typeId);
  }
}
