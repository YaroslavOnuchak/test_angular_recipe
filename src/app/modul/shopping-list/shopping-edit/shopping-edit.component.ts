import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output, OnDestroy
} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {Ingredient} from '../../../shared/ingredient.model';
import {NgForm} from "@angular/forms";
import * as ShoppingAction from "../../../shared/store/shopping-list.action"
import * as fromApp from '../../../shared/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  @ViewChild('f', {static: false}) shopForm: NgForm;
  subscription: Subscription;
  editMode = false
  editedIndexItem: number
  editedItem: Ingredient;

  constructor(
    // private shopSer: ShopService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shopForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.store.dispatch(new ShoppingAction.StopEdit())
  }

  clear() {
    this.editMode = false;
    this.shopForm.reset()
    this.store.dispatch(new ShoppingAction.StopEdit())
  }

  onDelete() {
    // this.shopSer.deleteIngrediend(this.editedIndexItem)
    this.store.dispatch(new ShoppingAction.DeleteIngrediend())
    this.shopForm.reset()

  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    const newIngredient = new Ingredient(form.value.name,
      form.value.amount);
    if (this.editMode) {
      // this.shopSer.updateIngrediendt(this.editedIndexItem, newIngredient)
      this.store.dispatch(new ShoppingAction.UpdateIngrediend(newIngredient))
    } else {
      // this.shopSer.addIngredient(newIngredient)
      this.store.dispatch(new ShoppingAction.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset()
  }

}
