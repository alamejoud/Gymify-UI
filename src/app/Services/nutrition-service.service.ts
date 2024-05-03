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
}
