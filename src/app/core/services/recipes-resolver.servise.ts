import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../../shared/recipe.model";
import {DataStorageService} from "./data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverServise implements Resolve<Recipe[]> {
  constructor(private dataService: DataStorageService,
              private route: Router,
              private resipeService: RecipeService
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
