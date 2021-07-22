import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from "../../recipes/recipe.model";
import {Ingredient} from 'src/app/shared/ingredient.model';
import {ShopService} from "./RecipeShop/recipe-shop.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeServiseService {

  recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simply a test',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/04/15/fn_frozen-pasta-and-chicken-getty_s4x3.jpg.rend.hgtvcom.406.305.suffix/1618503700797.jpeg',
      [
        new Ingredient('Meat', 1), new Ingredient('Meat', 1)
      ]),
    new Recipe('Another Test Recipe',
      'This is simply a test',
      'https://static01.nyt.com/images/2021/05/17/dining/kc-korean-bulgogi-burger/kc-korean-bulgogi-burger-mediumSquareAt3X.jpg',
      [
        new Ingredient('Meat', 21),
        new Ingredient('French Fries', 11),
      ])
  ];

  constructor(private shoppingService: ShopService) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index]
  }

  addIngrediendsToShoppingList(ingrediends: Ingredient[]) {
    this.shoppingService.addIngrediends(ingrediends)
  }
}
