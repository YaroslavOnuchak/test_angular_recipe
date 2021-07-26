import {Component, OnInit} from '@angular/core';

import {Ingredient} from '../shared/ingredient.model';
import {ShopService} from "../core/services/RecipeShop/recipe-shop.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shopListService: ShopService) {
  }

  ngOnInit() {
    this.ingredients = this.shopListService.getIngredients();
    this.shopListService.ingredientsChanged.subscribe(
      (ingrediends: Ingredient[]) => {
        this.ingredients = ingrediends
      }
    )
  }

  onEditItem(index: number) {
    this.shopListService.staredEditing.next(index)
  }


}
