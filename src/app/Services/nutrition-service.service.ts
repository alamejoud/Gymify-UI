import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeVO } from '../VO/RecipeVO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionServiceService {

  constructor(private http: HttpClient) { }

  getRecipeById(recipeId: number): Observable<any> {
    return this.http.get<RecipeVO>('http://localhost:9090/nutrition/getRecipeById?recipeId=' + recipeId);
  }
}
