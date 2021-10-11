import {Component, OnInit} from '@angular/core';

import {Recipe} from '../../shared/recipe.model';
import * as RecipeActions from "../../shared/store/recipe/recipe.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../../shared/store/app.reducer";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

}
