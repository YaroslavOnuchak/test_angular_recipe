import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from "./shared/store/app.reducer"
import * as AuthActions from "./shared/store/auth.actions"
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>,
              @Inject(PLATFORM_ID) private platformId
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('isPlatformBrowser', isPlatformBrowser)
    }
    // this.authService.autoLogin()
    this.store.dispatch(new AuthActions.AutoLogin());
  }

}
