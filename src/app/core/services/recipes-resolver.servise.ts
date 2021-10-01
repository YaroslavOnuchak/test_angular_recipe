import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../../shared/recipe.model";
import {of} from "rxjs";
import {Actions, ofType} from '@ngrx/effects';
import {RecipeService} from "./recipe.service";
import {take, map, switchMap} from 'rxjs/operators';
import * as RecipesActions from '../../shared/store/recipe/recipe.actions';
import {Store} from "@ngrx/store";
import * as fromApp from '../../shared/store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverServise implements Resolve<Recipe[]> {
  constructor(
              private route: Router,
              private resipeService: RecipeService,
              private store: Store<fromApp.AppState>,
              private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageService.fetchRecipes();
   return this.store.select('recipes')
      .pipe(
        take(1),
        map(recipesArrState => {
          return recipesArrState.recipes
        }),
        switchMap(recipesArr => {
            if (recipesArr.length === 0) {
              this.store.dispatch(new RecipesActions.FetchRecipes());
              return this.actions$.pipe(
                ofType(RecipesActions.SET_RECIPES),
                take(1)
              );
            } else {
              return of(recipesArr)
            }
          }
        )
      );
  }
}
