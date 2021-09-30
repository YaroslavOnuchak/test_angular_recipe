import { Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store"
import { Subscription} from "rxjs";
import * as AuthActions from "../../shared/store/auth.actions";
import * as fropmApp from "../../shared/store/app.reducer"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: string = null;
  isLoginMode: boolean = true;
  user: any;
  userDetails: any;

  private storeSub: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fropmApp.AppState>,
    // private authSocialSer: SocialAuthService
  ) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth')
      .subscribe((authSate: any) => {
        this.loading = authSate.loading;
        this.error = authSate.authError
      })
    // this.store.dispatch(new CheckLoggedUser());
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formFields() {
    return this.loginForm.controls;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(event: any): void {
    if (this.loginForm.invalid) {
      return
    }
    // let authObs: Observable<AuthResponseData>;
    const email = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.loading = true;
    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart(
          {
            email: email,
            password: password
          }))
    } else {
      this.store.dispatch(
        new AuthActions.SignUpStart(
          {email: email, password: password})
      );
    }
    this.loginForm.reset()
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
