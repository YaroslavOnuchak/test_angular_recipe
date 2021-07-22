import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipeServiseService} from "../../core/services/recipe-servise.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]
  constructor(private recipeService: RecipeServiseService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
  }

  onRecipeSelected(recipe: Recipe) {

  }

}
