import {Component, OnDestroy, OnInit, Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";
import * as fromApp from "../../shared/store/app.reducer"
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as AuthAction from "../../shared/store/auth.actions"
import * as RecipeActions from '../../shared/store/recipe/recipe.actions';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() back = new EventEmitter<any>()

  isAuthenticated: boolean = false
  private userSub: Subscription

  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.userSub = this.store.select('auth')
      .pipe(
        map(authUser => {
          return authUser.user
        })
      ).subscribe(
        user => {
          this.isAuthenticated = !!user
        }
      )
  }

  logOut() {
    this.store.dispatch(new AuthAction.Logout())
  }

  onSave() {
    this.store.dispatch(RecipeActions.StoreRecipes())
  }


  onFetchData() {
    // this.dataService.fetchDataRecips().subscribe()
    // this.router.navigate(['recipes'], {relativeTo: this.route})
    this.store.dispatch(new RecipeActions.FetchRecipes());

  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
