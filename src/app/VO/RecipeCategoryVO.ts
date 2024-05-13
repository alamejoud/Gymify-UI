import { RecipeVO } from "./RecipeVO";

export class RecipeCategoryVO {
  recipeCategoryId: number;
  recipeCategory: string;
  recipes: RecipeVO[] = [];
}
