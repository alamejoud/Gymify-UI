import { RecipeVO } from "./RecipeVO";

export class KeywordVO {
  keywordId: number;
  keyword: string;
  recipes: RecipeVO[] = [];
}
