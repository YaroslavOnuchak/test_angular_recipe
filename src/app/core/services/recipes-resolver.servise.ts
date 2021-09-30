import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../../shared/recipe.model";
import {DataStorageService} from "./data-storage.service";
import {Observable} from "rxjs";
import { Actions, ofType } from '@ngrx/effects';
import {RecipeService} from "./recipe.service";
import { take } from 'rxjs/operators';
import * as RecipesActions from '../../shared/store/recipe/recipe.actions';
import {Store} from "@ngrx/store";
import * as fromApp from '../../shared/store/app.reducer';
@Injectable({
  providedIn: 'root'
})
export class RecipesResolverServise implements Resolve<Recipe[]> {
  constructor(private dataService: DataStorageService,
              private route: Router,
              private resipeService: RecipeService,
              private store: Store<fromApp.AppState>,
              private actions$: Actions
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageService.fetchRecipes();
    this.store.dispatch(new RecipesActions.FetchRecipes());
    return this.actions$.pipe(
      ofType(RecipesActions.SET_RECIPES),
      take(1)
    );
  }
}
