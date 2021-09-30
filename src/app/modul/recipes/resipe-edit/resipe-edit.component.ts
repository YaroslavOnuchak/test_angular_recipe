import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from "../../../core/services/recipe.service";
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from '../../../shared/store/app.reducer';

@Component({
  selector: "app-resipe-edit",
  templateUrl: "./resipe-edit.component.html",
  styleUrls: ["./resipe-edit.component.scss"],
})
export class ResipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private resepiServi: RecipeService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param["id"];
      this.editMode = param["id"] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }

  private initForm() {
    let recipe;
    let ingredientsArray = new FormArray([]);
    if (this.editMode) {
      this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )   .subscribe(recipe => {
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
          for (let ing of recipe.ingredients) {
            ingredientsArray.push(
              this.fb.group({
                name: ing.name,
                amount: ing.amount,
              })
            );
          }
        }
      });


    } else {
    }


  }

  get ingrediendsListArray(): FormArray {
    return this.recipeForm.get("ingrediends") as FormArray;
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
      this.resepiServi.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.resepiServi.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  onDeleteIngredient(i: number) {
    this.ingrediendsListArray.removeAt(i);
  }
}
