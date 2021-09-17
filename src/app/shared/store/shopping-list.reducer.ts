import {Ingredient} from "../ingredient.model";
import {Action} from "@ngrx/store";
import * as ShoppingAction from "./shopping-list.action"
import {DELETE_INGREDIENDT, ShoppingListAction, UPDATE_INGREDIENDT} from "./shopping-list.action";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
}

export function ShopReducer(
  state = initialState,
  action: ShoppingListAction
) {
  switch (action.type) {
    case ShoppingAction.ADD_INGREDIEND:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      }
    case ShoppingAction.ADD_INGREDIENDS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      }
    case ShoppingAction.UPDATE_INGREDIENDT:
      const ingrediend = state.ingredients[action.payload.index]
      const updateIngrediend = {
        ...ingrediend,
        ...action.payload.ingrediend
      }
      const updateIngrediends = [...state.ingredients]
      updateIngrediends[action.payload.index] = updateIngrediend
      return {
        ...state,
        ingredients: updateIngrediends
      }
    case ShoppingAction.DELETE_INGREDIENDT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      }
    default:
      return state
  }
}


