import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Recipe} from '../../shared/recipe.model';
import {map, tap, take, exhaustMap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Store} from "@ngrx/store";
import * as fromAppState from "../../shared/store/app.reducer";
import * as RecipesActions from "../../shared/store/recipe/recipe.actions";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromAppState.AppState>
  ) {
  }


  setDataRecipes() {
    const recipes = this.recipeService.getRecipes()
    this.http.put('https://recipe-rec1pe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes)
      .subscribe(res => {
        console.log(res)
      })
  }

  fetchDataRecips() {
    return this.http.get<Recipe[]>(
      'https://recipe-rec1pe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    )
      .pipe(
        map(recipes => {
          return recipes.map(el => {
            return {
              ...el,
              ingredients: el.ingredients ? el.ingredients : []
            }
          })
        }),
        tap(res => {
            // this.recipeService.setRecipes(res)
            this.store.dispatch(new RecipesActions.SetRecipes(res))
          }
        )
      )
  }
}
