import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { NutritionServiceService } from '../Services/nutrition-service.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { RecipeVO } from '../VO/RecipeVO';
import { CommonServiceService } from '../Services/common-service.service';
import { DietVO } from '../VO/DietVO';
import { DietRecipeVO } from '../VO/DietRecipeVO';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-diet-plan',
  templateUrl: './create-diet-plan.component.html',
  styleUrl: './create-diet-plan.component.css'
})
export class CreateDietPlanComponent {

  dietPlans = [];
  recipeList = [];
  selectedRecipes = [];
  selectedDietPlan = new DietVO();
  editedDietPlan = new DietVO();
  first: number = 0;
  rows: number = 5;
  totalRecords: number = 0;
  searchInput = '';
  searchToSend = '';
  loading = false;
  dietPlanLoading = false;
  showRecipeSearch = false;
  day = '';
  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  namePopup = false;

  constructor(private route: ActivatedRoute, private nutritionServiceService: NutritionServiceService, private commonServiceService: CommonServiceService, private confirmationService: ConfirmationService) {

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

  filterRecipes() {
    this.fillListWithSkeleton();
    this.nutritionServiceService.filteredRecipes(this.searchToSend, this.first, this.rows, 'name').subscribe({
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

  fillDietPlanDaysWithSkeleton() {
    this.days.forEach(day => {
      this.editedDietPlan[day + 'Recipes'] = [];
      for (let i = 0; i < 5; i++) {
        let dietRecipeVO = new DietRecipeVO();
        dietRecipeVO.recipe = new RecipeVO();
        this.editedDietPlan[day + 'Recipes'].push(dietRecipeVO);
      }
    });
  }

  getDietPlans() {
    this.fillDietPlansWithSkeleton();
    this.nutritionServiceService.getDietPlans(this.commonServiceService.getRole() != 'trainee').subscribe({
      next: (data) => {
        this.dietPlans = data.dietPlanList;
        if (this.dietPlans.length > 0 && this.route.snapshot.paramMap.get('dietId')) {
          this.selectedDietPlan = this.dietPlans.find(diet => diet.dietId === Number(this.route.snapshot.paramMap.get('dietId')));
          this.editedDietPlan = JSON.parse(JSON.stringify(this.selectedDietPlan));
        } else {
          this.selectedDietPlan = new DietVO();
          this.editedDietPlan = new DietVO();
        }
        this.dietPlanLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  search() {
    this.searchToSend = this.searchInput;
    this.first = 0;
    this.rows = 5;
    this.filterRecipes();
  }

  onPageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.filterRecipes();
  }

  openRecipes(day) {
    this.day = day;
    this.showRecipeSearch = true;
    this.first = 0;
    this.rows = 5;
    this.searchToSend = '';
    this.searchInput = '';
    this.selectedRecipes = [];
    this.filterRecipes();
  }

  getCommonService() {
    return this.commonServiceService;
  }

  addDiet() {
    this.nutritionServiceService.openRecipeInfo = false;
    this.nutritionServiceService.selectedRecipe = new RecipeVO();
    this.selectedDietPlan = new DietVO();
    this.editedDietPlan = new DietVO();
    this.selectedRecipes = [];
    this.showRecipeSearch = false;
  }

  openRecipeInfo(recipe) {
    this.nutritionServiceService.selectedRecipe = recipe;
    this.nutritionServiceService.openRecipeInfo = true;
  }

  addRecipeToDay() {
    if (this.selectedRecipes?.length > 0) {
      this.selectedRecipes.forEach(selectedRecipe => {
        let dietRecipe: DietRecipeVO = new DietRecipeVO();
        dietRecipe.recipe = selectedRecipe;
        dietRecipe.recipeId = selectedRecipe.recipeId;
        dietRecipe.diet = this.editedDietPlan;
        dietRecipe.dietId = this.editedDietPlan.dietId;
        dietRecipe.day = this.days.indexOf(this.day) + 1;
        this.editedDietPlan[this.day + 'Recipes'] = [...this.editedDietPlan[this.day + 'Recipes'], dietRecipe];
      });
      this.selectedRecipes = [];
      this.showRecipeSearch = false;
    }
  }

  removeFromList(recipe, day) {
    this.editedDietPlan[day + 'Recipes'].splice(this.editedDietPlan[day + 'Recipes'].indexOf(recipe), 1);
  }

  cancel() {
    this.editedDietPlan = JSON.parse(JSON.stringify(this.selectedDietPlan));
    this.selectedRecipes = [];
    this.showRecipeSearch = false;
    this.nutritionServiceService.openRecipeInfo = false;
    this.nutritionServiceService.selectedRecipe = new RecipeVO();
    console.log(this.editedDietPlan);
  }

  saveDiet() {
    let modifiedDiet: DietVO = { ...this.editedDietPlan };
    this.days.forEach(day => {
      modifiedDiet[day + 'Recipes'].forEach((dietRecipe) => {
        delete dietRecipe.diet;
      });
    });
    delete modifiedDiet.createdBy;
    this.nutritionServiceService.saveDiet(modifiedDiet).subscribe({
      next: response => {
        this.commonServiceService.handleSuccess(response.message);
        this.namePopup = false;
        if (!modifiedDiet || modifiedDiet.dietId === 0) {
          this.selectedDietPlan = new DietVO();
          this.editedDietPlan = new DietVO();
        }
        this.getDietPlans();
      },
      error: error => {
        this.commonServiceService.handleError(error);
        console.log(error);
      }
    });
  }

  showNamePopup() {
    console.log(this.namePopup);

    this.namePopup = true;
  }

  dietIsNotEmpty() {
    return (this.editedDietPlan.mondayRecipes && this.editedDietPlan.mondayRecipes.length > 0)
      || (this.editedDietPlan.tuesdayRecipes && this.editedDietPlan.tuesdayRecipes.length > 0)
      || (this.editedDietPlan.wednesdayRecipes && this.editedDietPlan.wednesdayRecipes.length > 0)
      || (this.editedDietPlan.thursdayRecipes && this.editedDietPlan.thursdayRecipes.length > 0)
      || (this.editedDietPlan.fridayRecipes && this.editedDietPlan.fridayRecipes.length > 0)
      || (this.editedDietPlan.saturdayRecipes && this.editedDietPlan.saturdayRecipes.length > 0)
      || (this.editedDietPlan.sundayRecipes && this.editedDietPlan.sundayRecipes.length > 0);

  }

  selectDiet(diet) {
    this.selectedDietPlan = diet;
    this.editedDietPlan = JSON.parse(JSON.stringify(this.selectedDietPlan));
  }

  confirmDelete(event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this diet plan?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.deleteDiet();
      }
    });
  }

  deleteDiet() {
    this.nutritionServiceService.deleteDiet(this.selectedDietPlan.dietId).subscribe({
      next: response => {
        this.commonServiceService.handleSuccess(response.message);
        this.getDietPlans();
      },
      error: error => {
        this.commonServiceService.handleError(error);
      }
    })
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

}
