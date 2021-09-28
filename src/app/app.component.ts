import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from "./shared/store/app.reducer"
import * as AuthActions from "./shared/store/auth.actions"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>,) {
  }

  ngOnInit() {
    // this.authService.autoLogin()
    this.store.dispatch(new AuthActions.AutoLogin());
  }

}
