import { Component } from '@angular/core';
import { DietVO } from '../VO/DietVO';
import { RecipeVO } from '../VO/RecipeVO';
import { DietRecipeVO } from '../VO/DietRecipeVO';
import { NutritionServiceService } from '../Services/nutrition-service.service';
import { CommonServiceService } from '../Services/common-service.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-browse-diets',
  templateUrl: './browse-diets.component.html',
  styleUrl: './browse-diets.component.css'
})
export class BrowseDietsComponent {

  dietPlans = [];
  recipeList = [];
  selectedRecipes = [];
  selectedDietPlan = new DietVO();
  first: number = 0;
  rows: number = 5;
  totalRecords: number = 0;
  search = '';
  loading = false;
  dietPlanLoading = false;
  showRecipeSearch = false;
  day = '';
  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  namePopup = false;

  constructor(private nutritionServiceService: NutritionServiceService, private commonServiceService: CommonServiceService, private confirmationService: ConfirmationService) {

  }

  ngOnInit() {
    this.nutritionServiceService.openRecipeInfo = false;
    this.nutritionServiceService.selectedRecipe = new RecipeVO();

    this.getDietPlans();

  }

  fillListWithSkeleton() {
    this.loading = true;
    this.recipeList = [];
    for (let i = 0; i < 5; i++) {
      this.recipeList.push(new RecipeVO());
    }
  }

  fillDietPlansWithSkeleton() {
    this.dietPlanLoading = true;
    this.dietPlans = [];
    for (let i = 0; i < 10; i++) {
      this.dietPlans.push(new RecipeVO());
    }
    this.fillDietPlanDaysWithSkeleton();
  }

  fillDietPlanDaysWithSkeleton() {
    this.days.forEach(day => {
      this.selectedDietPlan[day + 'Recipes'] = [];
      for (let i = 0; i < 5; i++) {
        let dietRecipeVO = new DietRecipeVO();
        dietRecipeVO.recipe = new RecipeVO();
        this.selectedDietPlan[day + 'Recipes'].push(dietRecipeVO);
      }
    });
  }

  getDietPlans() {
    console.log(this.search);

    this.fillDietPlansWithSkeleton();
    this.nutritionServiceService.getDietitiansDietPlans(this.search).subscribe({
      next: (data) => {
        this.dietPlans = data.dietPlanList;
        if (this.dietPlans.length > 0) {
          this.selectedDietPlan = this.dietPlans[0];
        } else {
          this.selectedDietPlan = new DietVO();
        }
        this.dietPlanLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getCommonService() {
    return this.commonServiceService;
  }

  openRecipeInfo(recipe) {
    this.nutritionServiceService.selectedRecipe = recipe;
    this.nutritionServiceService.openRecipeInfo = true;
  }

  selectDiet(diet) {
    this.selectedDietPlan = diet;
  }

  unsubscribeToDiet(diet) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to unsubscribe from this diet plan?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.nutritionServiceService.unsubscribeToDiet(diet.dietId).subscribe({
          next: response => {
            this.commonServiceService.handleSuccess(response.message);
            this.getDietPlans();
          },
          error: error => {
            this.commonServiceService.handleError(error);
          }
        });
      }
    });
  }

  subscribeToDiet(dietPlan) {
    this.nutritionServiceService.subscribeToDiet(dietPlan.dietId).subscribe({
      next: response => {
        this.commonServiceService.handleSuccess(response.message);
        this.getDietPlans();
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    });
  }

  isSubscribed(dietPlan) {
    return dietPlan.users.find(user => user.username.toLowerCase() == this.commonServiceService.getUsername().toLowerCase()) != undefined;
  }

}
