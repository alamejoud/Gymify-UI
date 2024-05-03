import { Component } from '@angular/core';
import { NutritionServiceService } from '../Services/nutrition-service.service';
import { RecipeVO } from '../VO/RecipeVO';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrl: './recipe-info.component.css'
})
export class RecipeInfoComponent {

  recipe: RecipeVO;
  responsiveOptions: any[] | undefined;
  defaultImage = [
    {
      imageSrc: 'assets/demo/images/nutrition/recipe1.jpg',
    }
  ]

  constructor(private nutritionServiceService: NutritionServiceService, private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.recipe = this.nutritionServiceService.selectedRecipe;
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

  getCommonService() {
    return this.commonServiceService;
  }

}
