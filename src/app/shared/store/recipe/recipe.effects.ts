import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {switchMap, map, tap} from 'rxjs/operators';

import * as RecipesActions from './recipe.actions';
import {Recipe} from "../../recipe.model";
import {Store} from "@ngrx/store";
import * as fromAppState from "../app.reducer";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://recipe-rec1pe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      );
    }),
    map(recipes => {
      console.log('resipes3');
      return recipes.map(el => {
        return {
          ...el,
          ingredients: el.ingredients ? el.ingredients : []
        }
      })
    }),
    map(res => {
     return new RecipesActions.SetRecipes(res)
      }
    )
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromAppState.AppState>) {
    console.log('resipes')
  }
}
