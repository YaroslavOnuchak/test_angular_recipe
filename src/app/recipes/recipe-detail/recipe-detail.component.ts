import { Component, OnInit } from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipeServiseService } from "../../core/services/recipe-servise.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private resepiServis: RecipeServiseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // const this.route.snapshot.params['id'];
    this.route.params.subscribe((data: Params) => {
      this.id = +data["id"];
      this.recipe = this.resepiServis.getRecipe(this.id);
    });
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], {relativeTo: this.route})
  }
  onDeleteRecipe() {
    this.resepiServis.deleteRecipe(this.id);
    this.router.navigate(["../"]);
  }
  onAddToShoppingList() {
    this.resepiServis.addIngrediendsToShoppingList(this.recipe.ingrediends);
  }
}