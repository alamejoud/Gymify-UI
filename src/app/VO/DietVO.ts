import { DietRecipeVO } from "./DietRecipeVO";
import { UserVO } from "./UserVO";

export class DietVO {
  dietId: number;
  dietName: string;
  createdBy: UserVO;
  mondayRecipes: DietRecipeVO[] = [];
  tuesdayRecipes: DietRecipeVO[] = [];
  wednesdayRecipes: DietRecipeVO[] = [];
  thursdayRecipes: DietRecipeVO[] = [];
  fridayRecipes: DietRecipeVO[] = [];
  saturdayRecipes: DietRecipeVO[] = [];
  sundayRecipes: DietRecipeVO[] = [];
  users: UserVO[] = [];
}
