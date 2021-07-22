import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../../../shared/ingredient.model";
import {Recipe} from "../../../recipes/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  ingrediendsChanged = new EventEmitter<Ingredient[]>()
   private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }

  getIngredients():Ingredient[] {
   return  this.ingredients.slice()
  }

  addIngredient(ingrediend:Ingredient){
    this.ingredients.push(ingrediend)
    this.ingrediendsChanged.emit(this.ingredients.slice())
  }
  addIngrediends(ingrediends:Ingredient[]){
    // for(let ing of ingrediends){
    //
    // }
    this.ingredients.push(...ingrediends)
    this.ingrediendsChanged.emit(this.ingredients.slice())

  }
}
