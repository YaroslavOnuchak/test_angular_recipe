import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";

import {StoreDevtoolsModule} from "@ngrx/store-devtools"
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./modul/header/header.component";
import {RecipesComponent} from "./modul/recipes/recipes.component";
import {RecipeListComponent} from "./modul/recipes/recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./modul/recipes/recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./modul/recipes/recipe-list/recipe-item/recipe-item.component";
import {ShoppingListComponent} from "./modul/shopping-list/shopping-list.component";
import {ShoppingEditComponent} from "./modul/shopping-list/shopping-edit/shopping-edit.component";
import {DropdownDirective} from "./shared/dropdown.directive";
import {RecipeService} from "./core/services/recipe.service";
import {AppRoutingModule} from "./app-routing.module";
import {ResipeStartComponent} from "./modul/recipes/resipe-start/resipe-start.component";
import {ResipeEditComponent} from "./modul/recipes/resipe-edit/resipe-edit.component";
import {ShopService} from "./core/services/recipe-shop.service";
import {EffectsModule} from "@ngrx/effects";

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {AuthComponent} from './modul/auth/auth.component'
import {AuthService} from "./core/services/auth.service";
import {AuthInterceptorService} from "./shared/auth-interceptor.service";
import * as fromApp from './shared/store/app.reducer';
import {AuthEffects} from "./shared/store/auth.effects";
import {environment} from "../environments/environment";
import {RecipeEffects} from "./shared/store/recipe/recipe.effects";
// import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    ResipeStartComponent,
    ResipeEditComponent,
    AuthComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    // StoreRouterConnectingModule.forRoot(),
    // StoreModule.forRoot({shoppingList:ShopReducer})
  ],
  providers: [RecipeService, ShopService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
