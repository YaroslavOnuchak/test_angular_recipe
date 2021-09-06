import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {Recipe} from "../../modul/recipes/recipe.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  ingredientsChanged = new Subject<Ingredient[]>()
  staredEditing = new Subject<number>()
  ingrediendsChanged = new EventEmitter<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  getIngrediend(index: number) {
    return this.ingredients[index];
  }

  deleteIngrediend(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
    // return
  }

  addIngredient(ingrediend: Ingredient) {
    this.ingredients.push(ingrediend)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngrediends(ingrediends: Ingredient[]) {
    // for(let ing of ingrediends){
    // }
    this.ingredients.push(...ingrediends)
    this.ingredientsChanged.next(this.ingredients.slice())

  }

  updateIngrediendt(index: number, newIng: Ingredient) {
    this.ingredients[index] = newIng;
    this.ingredientsChanged.next(this.ingredients.slice())
    this.ingredientsChanged.subscribe(dtta => console.log(dtta))
    // console.log(this.ingredientsChanged)
  }
}
