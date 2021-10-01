import {createAction, Action, props} from '@ngrx/store';
import {Recipe} from "../../recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipes';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
// export const STORE_RECIPES = '[Recipe] Store Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipes implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number, newRecipe: Recipe }) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}

// export class StoreRecipes implements Action {
//   readonly type = STORE_RECIPES;
// }
export const StoreRecipes = createAction(
  '[Recipe] Store Recipes'
);


export type RecipesActions =
  | SetRecipes
  | UpdateRecipes
  | AddRecipes
  | DeleteRecipe
  | FetchRecipes;
