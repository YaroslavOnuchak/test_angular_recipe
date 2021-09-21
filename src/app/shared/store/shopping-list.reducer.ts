import {Ingredient} from "../ingredient.model";
import {Action} from "@ngrx/store";
import * as ShoppingListAction from "./shopping-list.action"


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function ShopReducer(
  state = initialState,
  action: ShoppingListAction.ShoppingListAction
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIEND:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      }
    case ShoppingListAction.ADD_INGREDIENDS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload
        ]
      }
    case ShoppingListAction.UPDATE_INGREDIENDT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updateIngrediend = {
        ...ingredient,
        ...action.payload
      }
      const updateIngrediends = [...state.ingredients]
      updateIngrediends[state.editedIngredientIndex] = updateIngrediend
      return {
        ...state,
        ingredients: updateIngrediends,
        editedIngredientIndex: -1,
        editedIngredient: null
      }
    case ShoppingListAction.DELETE_INGREDIENDT:
      return {
        ...state,
        ingredients: state.ingredients.filter((el, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      }
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}


