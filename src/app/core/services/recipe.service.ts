import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "../../shared/recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShopService } from "./recipe-shop.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
  ];

  constructor(private shoppingService: ShopService) {}

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())

  }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngrediendsToShoppingList(ingrediends: Ingredient[]) {
    if (ingrediends.length > 0) {
      console.log(ingrediends);
      this.shoppingService.addIngrediends(ingrediends);
    }
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteIngredient(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
