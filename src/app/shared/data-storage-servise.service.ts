import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeServiseService } from '../core/services/recipe-servise.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageServiseService {

  constructor(private http: HttpClient, 
    private recipeServise:RecipeServiseService) { }


  setDataRecipes(){
    const recipes = this.recipeServise.getRecipes()
     this.http.put('https://recipe-rec1pe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', 
    recipes).subscribe(res => {
      console.log('serv', res)
    })

  }
}
