import { IngredientVO } from "./IngredientVO";
import { RecipeVO } from "./RecipeVO";

export class RecipeIngredientVO {
  recipeIngredientId: number;
  recipeId: number;
  recipe: RecipeVO;
  ingredientId: number;
  ingredient: IngredientVO;
  ingredientQuantity: string;
}
