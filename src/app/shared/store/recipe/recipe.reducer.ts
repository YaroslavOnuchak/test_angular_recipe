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

    case RecipesActions.ADD_RECIPE:
      console.log("recipeReducer")
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updateRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      }
      const updateRecipesArr = [...state.recipes]
      updateRecipesArr[action.payload.index] = updateRecipe
      return {
        ...state,
        recipes: updateRecipesArr
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload
        })
      };
    default:
      return state;
  }
}
