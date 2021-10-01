import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../../core/services/recipe.service";
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as fromApp from '../../../shared/store/app.reducer';
import * as RecipeActions from "../../../shared/store/recipe/recipe.actions"
import {Subscription} from "rxjs";

@Component({
  selector: "app-resipe-edit",
  templateUrl: "./resipe-edit.component.html",
  styleUrls: ["./resipe-edit.component.scss"],
})
export class ResipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private storeSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private resepiServi: RecipeService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param["id"];
      this.editMode = param["id"] != null;
      this.initForm();
      console.log()
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe()
    }
  }

  private initForm() {
    let recipe;
    let ingredientsArray = new FormArray([]);
    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        ).subscribe(recipe => {
          // recipeName = recipe.name;
          // recipeImagePath = recipe.imagePath;
          // recipeDescription = recipe.description;
          this.recipeForm = this.fb.group({
            name: [recipe?.name || "", Validators.required],
            imagePath: [recipe?.imagePath || "", [Validators.required]],
            description: [recipe?.description || "", []],
            ingredients: ingredientsArray,
          });
          if (recipe["ingredients"]) {

            for (const ingredient of recipe.ingredients) {

              ingredientsArray.push(
                this.fb.group({
                  name: ingredient.name,
                  amount: [ingredient.amount, Validators.pattern(/^[1-9]+[0-9]*$/)],
                })
              );
            }
          }
        });
    } else {
      this.recipeForm = this.fb.group({
        name: ["", Validators.required],
        imagePath: ["", [Validators.required]],
        description: "",
        ingredients: ingredientsArray,
      })
    }

  }

  get ingrediendsListArray(): FormArray {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  onAddIngrediend() {
    this.ingrediendsListArray.push(
      this.fb.group({
        name: "",
        amount: "",
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipes(
        {
          index: this.id,
          newRecipe: this.recipeForm.value
        }
      ))
    } else {
      this.store.dispatch(
        new RecipeActions.AddRecipes(this.recipeForm.value)
      )
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onDeleteIngredient(i: number) {
    this.ingrediendsListArray.removeAt(i);
  }
}
