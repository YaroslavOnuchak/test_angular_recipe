import * as RecipesActions from './recipe.actions';
import {Recipe} from "../../recipe.model";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      console.log("recipeReducer")
      return {
        ...state,
        recipes: [...action.payload]
      };
    default:
      return state;
  }
}
