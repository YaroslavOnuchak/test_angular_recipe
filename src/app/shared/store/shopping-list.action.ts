import {Action} from "@ngrx/store";
import {Ingredient} from "../ingredient.model";

export const ADD_INGREDIEND = 'ADD_INGREDIEND';
export const ADD_INGREDIENDS = 'ADD_INGREDIENDS';
export const UPDATE_INGREDIENDT = 'UPDATE_INGREDIENDT';
export const DELETE_INGREDIENDT = 'DELETE_INGREDIENDT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

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

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngrediend implements Action {
  readonly type = DELETE_INGREDIENDT;

}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {
  }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListAction =
  | AddIngredients
  | AddIngredient
  | UpdateIngrediend
  | DeleteIngrediend
  | StartEdit
  | StopEdit;

