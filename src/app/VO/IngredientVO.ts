import { RecipeIngredientVO } from "./RecipeIngredientVO";

export class IngredientVO {
  ingredientId: number;
  ingredientName: string;
  recipeIngredients: RecipeIngredientVO[] = [];
}
