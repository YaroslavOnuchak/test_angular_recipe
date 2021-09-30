import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";
import {map, tap} from "rxjs/operators";
import {Recipe} from "../../../shared/recipe.model";
import {RecipeService} from "../../../core/services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {relative} from "@angular/compiler-cli/src/ngtsc/file_system";
import {Observable, Subscription} from "rxjs";
import {DataStorageService} from "../../../core/services/data-storage.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../shared/store/app.reducer"
import * as RecipesActions from "../../../shared/store/recipe/recipe.actions";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipes$: Observable<any> = this.store.select("recipes");
  subscription: Subscription;

  constructor(
    private dataService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    // this.dataService.fetchDataRecips().subscribe()

    this.subscription = this.store
      .select('recipes')
      .pipe(map(resData => resData.recipes))
      .subscribe((recipes: Recipe[]) => {
          this.recipes = recipes
        console.log(this.recipes)
        }
      )

    // this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRecipeSelected(recipe: Recipe) {
  }

  onNewRecipe() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}
