import { KeywordVO } from "./KeywordVO";
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
  datePublished: string;
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
  createdBy: UserVO;
  images: RecipeImageVO[] = [];
  instructions: RecipeInstructionVO[] = [];
  ingredients: RecipeIngredientVO[] = [];
  keywords: KeywordVO[] = [];
}
