import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseVO } from '../VO/ExerciseVO';

@Injectable({
  providedIn: 'root'
})
export class ExerciseServiceService {

  autoCompleteSelectedExerciseId: number = 0;

  constructor(private http: HttpClient) { }

  getExerciseCategories(group: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseCategories?group=' + group);
  }
  getExercisesByMuscle(muscleId: string, first: number, size: number): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getPaginatedExercisesByMuscle?muscleId=' + muscleId + '&first=' + first + '&size=' + size);
  }
  getExercisesByEquipment(equipmentId: string, first: number, size: number): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getPaginatedExercisesByEquipment?equipmentId=' + equipmentId + '&first=' + first + '&size=' + size);
  }
  getExercisesByType(typeId: string, first: number, size: number): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getPaginatedExercisesByType?typeId=' + typeId + '&first=' + first + '&size=' + size);
  }
  getExercisesBySearch(search: string, first: number, size: number): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getPaginatedExercisesBySearch?search=' + search + '&first=' + first + '&size=' + size);
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
  getExerciseCount(groupId: string, categoryId: string): Observable<any> {
    return this.http.get('http://localhost:9090/exercise/getExerciseCount?group=' + groupId + '&id=' + categoryId);
  }

}
