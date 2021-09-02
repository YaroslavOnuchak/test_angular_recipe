import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RecipeServiseService} from '../core/services/recipe-servise.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageServiseService {

  constructor(
    private http: HttpClient,
    private recipeServise: RecipeServiseService)
    {}


  setDataRecipes() {
    const recipes = this.recipeServise.getRecipes()
    this.http.put('https://recipe-rec1pe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes)
      .subscribe(res => {})
  }

  fetchDataRecips() {
    return this.http.get<Recipe[]>('https://recipe-rec1pe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map(el => {
            return {...el, ingrediends: el.ingrediends ? el.ingrediends : []}
          })
        }),
        tap(res => {
            this.recipeServise.setRecipes(res)
          }
        )
      )

  }
}
