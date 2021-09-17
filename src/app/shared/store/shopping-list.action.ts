import {Action} from "@ngrx/store";
import {Ingredient} from "../ingredient.model";

export const ADD_INGREDIEND = 'ADD_INGREDIEND';
export const ADD_INGREDIENDS = 'ADD_INGREDIENDS';
export const UPDATE_INGREDIENDT = 'UPDATE_INGREDIENDT';
export const DELETE_INGREDIENDT = 'DELETE_INGREDIENDT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIEND;




  // payload: Ingredient
  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENDS;

  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngrediend implements Action {
  readonly type = UPDATE_INGREDIENDT;

  constructor(public payload: { index: number, ingrediend: Ingredient }) {
  }
}

export class DeleteIngrediend implements Action {
  readonly type = DELETE_INGREDIENDT;

  constructor(public payload: number) {
  }
}

export type ShoppingListAction = AddIngredients
  | AddIngredient
  | UpdateIngrediend
  | DeleteIngrediend;

