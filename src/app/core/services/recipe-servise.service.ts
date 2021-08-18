import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "../../recipes/recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShopService } from "./RecipeShop/recipe-shop.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeServiseService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   "A Test Recipe",
    //   "This is simply a test",
    //   "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/04/15/fn_frozen-pasta-and-chicken-getty_s4x3.jpg.rend.hgtvcom.406.305.suffix/1618503700797.jpeg",
    //   [new Ingredient("Meat", 1), new Ingredient("Meat", 1)]
    // ),
    // new Recipe(
    //   "Another Test Recipe",
    //   "This is simply a test",
    //   "https://static01.nyt.com/images/2021/05/17/dining/kc-korean-bulgogi-burger/kc-korean-bulgogi-burger-mediumSquareAt3X.jpg",
    //   [new Ingredient("Meat", 21), new Ingredient("French Fries", 11)]
    // ),
    // new Recipe(
    //   "forest`s fish",
    //   "here could be  a description",
    //   "https://cdn-tipmymenus-com.fra1.digitaloceanspaces.com/files/2370026f-9e91-4ae2-8134-a08f394ace23-medium.jpg",
    //   [new Ingredient("fish", 21), new Ingredient("plate", 1)]
    // ),
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
