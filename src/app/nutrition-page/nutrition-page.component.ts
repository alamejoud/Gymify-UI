import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonServiceService } from '../Services/common-service.service';
import { NutritionServiceService } from '../Services/nutrition-service.service';

@Component({
  selector: 'app-nutrition-page',
  templateUrl: './nutrition-page.component.html',
  styleUrl: './nutrition-page.component.css'
})
export class NutritionPageComponent {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private route: ActivatedRoute, private commonServiceService: CommonServiceService, private nutritionServiceService: NutritionServiceService) { }

  ngOnInit() {

    this.items = [
      {
        label: 'All Recipes',
        icon: 'fa-solid fa-bowl-food',
        routerLink: '/homePage/nutrition/allRecipes'
      },
      {
        label: 'Create Diet Plan',
        icon: 'pi pi-plus',
        routerLink: '/homePage/nutrition/createDietPlan'
      },
      {
        label: 'Diet Plan Generator',
        icon: 'fa-solid fa-brain',
        routerLink: '/homePage/nutrition/dietPlanGenerator'
      }
    ];

    this.activeItem = this.items[0];
  }

  getCommonService() {
    return this.commonServiceService;
  }

  getNutritionService() {
    return this.nutritionServiceService;
  }

}
