import { Component } from '@angular/core';
import { NutritionServiceService } from '../Services/nutrition-service.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent {

  constructor(private nutritionServiceService: NutritionServiceService) { }

  ngOnInit() {
    this.nutritionServiceService.getRecipeById(3260).subscribe({
      next: (recipe) => {
        console.log(recipe);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
