import { DietVO } from "./DietVO";
import { RecipeVO } from "./RecipeVO";

export class DietRecipeVO {
  dietRecipeId: number;
  recipeId: number;
  recipe: RecipeVO;
  dietId: number;
  diet: DietVO;
  day: number;
  recipeOrder: number;
}
