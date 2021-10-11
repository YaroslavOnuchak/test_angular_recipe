import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";
import {map, tap} from "rxjs/operators";
import {Recipe} from "../../../shared/recipe.model";
import {RecipeService} from "../../../core/services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {relative} from "@angular/compiler-cli/src/ngtsc/file_system";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../shared/store/app.reducer"
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  // animations: [
  //   trigger('list2', [
  //     transition(
  //       '* => void', [
  //         animate(1500, style({
  //           transform: 'translateX(100px)',
  //           opacity: '0.5'
  //         }))]
  //     )
  //   ])
  // ],
  selector: "app-recipe-list",
  template: `
    <div class="row">
      <div class="col-xs-12">
        <button
          class="btn btn-success"
          routerLink="new">New Recipe
        </button>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-xs-12"
      >
        <app-recipe-item
          *ngFor="let recipeEl of recipes; let i = index"
          [recipe]="recipeEl"
          [index]="i"
        ></app-recipe-item>
      </div>
    </div>`,
  styleUrls: ["./recipe-list.component.scss"],

})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipes$: Observable<any> = this.store.select("recipes");
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    // this.dataService.fetchDataRecips().subscribe()

    this.subscription = this.store
      .select('recipes')
      .pipe(map(resData => resData.recipes))
      .subscribe((recipes: Recipe[]) => {
          this.recipes = recipes
          console.log(this.recipes)
        }
      )

    // this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRecipeSelected(recipe: Recipe) {
  }

  onNewRecipe() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}
