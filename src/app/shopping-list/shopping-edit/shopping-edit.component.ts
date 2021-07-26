import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output, OnDestroy
} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShopService} from "../../core/services/RecipeShop/recipe-shop.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('f', {static: false}) shopForm: NgForm;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  subscription: Subscription;
  editMode = false
  editedIndexItem: number
  editrdItem: Ingredient;

  constructor(private shopSer: ShopService) {
  }

  ngOnInit() {
    this.subscription = this.shopSer.staredEditing
      .subscribe(index => {
        this.editedIndexItem = index;
        this.editMode = true;
        this.editrdItem = this.shopSer.getIngrediend(index);
        this.shopForm.setValue({
          name: this.editrdItem.name,
          amount: this.editrdItem.amount
        })
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()

  }
  clear(){
    this.editMode = false;
    this.shopForm.reset()
  }
  onDelete(){
    this.shopSer.deleteIngrediend(this.editedIndexItem)
    this.shopForm.reset()

  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    const newIngredient = new Ingredient(form.value.name,
      form.value.amount);
    if (this.editMode) {
      this.shopSer.updateIngrediendt(this.editedIndexItem, newIngredient)
    } else {
      this.shopSer.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset()
  }

}
