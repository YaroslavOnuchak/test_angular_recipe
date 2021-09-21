import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {Ingredient} from '../../shared/ingredient.model';
import {ShopService} from "../../core/services/recipe-shop.service";
import * as ShoppingAction from "../../shared/store/shopping-list.action"
import * as fromApp from '../../shared/store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private shopListService: ShopService,
    // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')

    // this.ingredients = this.shopListService.getIngredients();
    // this.shopListService.ingredientsChanged.subscribe(
      // (ingrediends: Ingredient[]) => {
        // this.ingredients = ingrediends
      // }
    // )
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingAction.StartEdit(index));
    // this.shopListService.staredEditing.next(index)
  }


}
