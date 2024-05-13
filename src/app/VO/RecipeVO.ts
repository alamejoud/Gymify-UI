import { DietRecipeVO } from "./DietRecipeVO";
import { KeywordVO } from "./KeywordVO";
import { RecipeCategoryVO } from "./RecipeCategoryVO";
import { RecipeImageVO } from "./RecipeImageVO";
import { RecipeIngredientVO } from "./RecipeIngredientVO";
import { RecipeInstructionVO } from "./RecipeInstructionVO";
import { UserVO } from "./UserVO";

export class RecipeVO {
  recipeId: number;
  externalRecipeId: number;
  recipeName: string;
  cookTime: string;
  prepTime: string;
  totalTime: string;
  publishedDate: Date;
  description: string;
  aggregatedRating: number;
  reviewCount: number;
  calories: number;
  fatContent: number;
  saturatedFatContent: number;
  cholesterolContent: number;
  sodiumContent: number;
  carbohydrateContent: number;
  fiberContent: number;
  sugarContent: number;
  proteinContent: number;
  recipeServings: number;
  recipeYield: String;
  recipeCategory: RecipeCategoryVO;
  createdBy: UserVO;
  images: RecipeImageVO[] = [];
  instructions: RecipeInstructionVO[] = [];
  ingredients: RecipeIngredientVO[] = [];
  keywords: KeywordVO[] = [];
  dietRecipes: DietRecipeVO[] = [];
}
