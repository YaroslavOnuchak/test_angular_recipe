import {Component, OnInit} from "@angular/core";

import {Recipe} from "../../../shared/recipe.model";
import {RecipeService} from "../../../core/services/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromAppState from "../../../shared/store/app.reducer";
import * as RecipesActions from "../../../shared/store/recipe/recipe.actions";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private resepiServis: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>
  ) {
  }

  ngOnInit() {
    // const this.route.snapshot.params['id'];
    // this.route.params
    //   .subscribe(
    //     (data: Params) => {
    //       this.id = +data["id"];
    //       this.recipe = this.resepiServis.getRecipe(this.id);
    // });
    this.route.params
      .subscribe((params) => {
        console.log(+params['id'])
        this.id = +params['id'];


        this.store.select('recipes')
          .pipe(
            map(recipesState => {
              return recipesState.recipes.find((recipe, index) => {
                console.log(index)
                return index === this.id;
              });
            })
          )
          .subscribe(recipe => {
          this.recipe = recipe;
        });
      })
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.resepiServis.deleteRecipe(this.id);
    this.router.navigate(["../"]);
  }

  onAddToShoppingList() {
    this.resepiServis.addIngrediendsToShoppingList(this.recipe.ingredients);
  }
}
