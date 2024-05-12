import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeVO } from '../VO/RecipeVO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionServiceService {

  openRecipeInfo: boolean = false;
  selectedRecipe: RecipeVO;

  constructor(private http: HttpClient) { }

  getRecipeById(recipeId: number): Observable<any> {
    return this.http.get<RecipeVO>('http://localhost:9090/nutrition/getRecipeById?recipeId=' + recipeId);
  }

  filteredRecipes(search, first, rows, searchOption): Observable<any> {
    return this.http.get<any>('http://localhost:9090/nutrition/filterRecipes?search=' + search + '&first=' + first + '&rows=' + rows + '&searchOption=' + searchOption);
  }

  getDietPlans(onlyCreatedDietPlans): Observable<any> {
    return this.http.get('http://localhost:9090/nutrition/getDietPlans?onlyCreatedDietPlans=' + onlyCreatedDietPlans);
  }

  saveDiet(diet): Observable<any> {
    return this.http.post('http://localhost:9090/nutrition/saveDiet', diet);
  }

  deleteDiet(dietId): Observable<any> {
    return this.http.delete('http://localhost:9090/nutrition/deleteDiet?dietId=' + dietId);
  }

  subscribeToDiet(dietId): Observable<any> {
    return this.http.post('http://localhost:9090/nutrition/subscribeToDiet?dietId=' + dietId, null);
  }

  unsubscribeToDiet(dietId): Observable<any> {
    return this.http.delete('http://localhost:9090/nutrition/unsubscribeToDiet?dietId=' + dietId);
  }

  getDietitiansDietPlans(search): Observable<any> {
    return this.http.get('http://localhost:9090/nutrition/getDietitiansDietPlans?search=' + search);
  }

  getMyDietNames(): Observable<any> {
    return this.http.get('http://localhost:9090/nutrition/getMyDietNames');
  }
}
