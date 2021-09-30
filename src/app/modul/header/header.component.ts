import {Component, OnDestroy, OnInit, Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";

import {DataStorageService} from "../../core/services/data-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
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
    private dataService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
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
          // console.log(user)
          // console.log(!user)
          // console.log(!!user)
        }
      )
  }

  logOut() {
    this.test()
  }

  test(): any {
    return new AuthAction.Logout()
  }

  onSave() {
    this.dataService.setDataRecipes();
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
