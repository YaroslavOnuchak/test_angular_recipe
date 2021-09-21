import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromAuth from '../store/auth.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShopReducer,
  auth: fromAuth.authReducer
};
