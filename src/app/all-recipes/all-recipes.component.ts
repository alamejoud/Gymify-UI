import { Component } from '@angular/core';
import { NutritionServiceService } from '../Services/nutrition-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { RecipeVO } from '../VO/RecipeVO';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent {

  recipeList: RecipeVO[] = [];
  searchOptions: any[] = [];
  searchOption;
  first: number = 0;
  rows: number = 15;
  totalRecords: number = 0;
  searchInput = '';
  searchToSend = '';
  loading = false;

  constructor(private nutritionServiceService: NutritionServiceService, private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.nutritionServiceService.openRecipeInfo = false;
    this.nutritionServiceService.selectedRecipe = new RecipeVO();
    this.searchOptions = [
      { label: 'Everything', value: 'everything' },
      { label: 'Name', value: 'name' },
      { label: 'Category', value: 'category' },
      { label: 'Ingredients', value: 'ingredients' }
    ];
    this.searchOption = this.searchOptions[0].value;

    this.first = 0;
    this.rows = 15;

    this.filterRecipes();
  }

  getCommonService() {
    return this.commonServiceService;
  }

  getNutritionService() {
    return this.nutritionServiceService;
  }

  onPageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.filterRecipes();
  }

  fillListWithSkeleton() {
    this.loading = true;
    this.recipeList = [];
    for (let i = 0; i < 15; i++) {
      this.recipeList.push(new RecipeVO());
    }
  }

  filterRecipes() {
    this.fillListWithSkeleton();
    this.nutritionServiceService.filteredRecipes(this.searchToSend, this.first, this.rows, this.searchOption).subscribe({
      next: (data) => {
        this.totalRecords = data.totalRecords;
        this.recipeList = data.recipeList;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  search() {
    this.searchToSend = this.searchInput;
    this.first = 0;
    this.rows = 15;
    this.filterRecipes();
  }

  openRecipeInfo(recipe: RecipeVO) {
    if (!this.loading) {
      this.nutritionServiceService.selectedRecipe = recipe;
      this.nutritionServiceService.openRecipeInfo = true;
    }
  }

}
