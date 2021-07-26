import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipeServiseService } from "../../core/services/recipe-servise.service";
import { ActivatedRoute, Router } from "@angular/router";
import { relative } from "@angular/compiler-cli/src/ngtsc/file_system";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeServiseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRecipeSelected(recipe: Recipe) {}

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
