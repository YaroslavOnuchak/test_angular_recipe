import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Recipe} from '../../shared/recipe.model';
import {map, tap, take, exhaustMap} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
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
    ).pipe(
      map(recipes => {
        return recipes.map(el => {
          return {
            ...el,
            ingrediends: el.ingrediends ? el.ingrediends : []
          }
        })
      }),
      tap(res => {
          this.recipeService.setRecipes(res)
        }
      ))
  }
}
