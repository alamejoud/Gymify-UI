import { Component } from '@angular/core';
import { NutritionServiceService } from '../Services/nutrition-service.service';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent {

  recipe;

  constructor(private nutritionServiceService: NutritionServiceService, private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.nutritionServiceService.getRecipeById(3260).subscribe({
      next: (data) => {
        console.log(data);
        this.recipe = data.recipe;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getCommonService() {
    return this.commonServiceService;
  }

}
