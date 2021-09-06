import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../../modul/recipes/recipe.model";
import {DataStorageServiseService} from "./data-storage-servise.service";
import {Observable} from "rxjs";
import {RecipeServiseService} from "./recipe-servise.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverServise implements Resolve<Recipe[]> {
  constructor(private dataService: DataStorageServiseService,
              private route: Router,
              private resipeService: RecipeServiseService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.resipeService.getRecipes()

    if (recipes.length === 0) {
      return this.dataService.fetchDataRecips()
    } else {
      return recipes;
    }
  }
}
