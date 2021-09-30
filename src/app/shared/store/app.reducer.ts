import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromAuth from '../store/auth.reducer';
import * as fromRecipe from '../store/recipe/recipe.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShopReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipe.recipeReducer
};
