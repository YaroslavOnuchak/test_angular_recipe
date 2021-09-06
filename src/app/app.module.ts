import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./modul/header/header.component";
import { RecipesComponent } from "./modul/recipes/recipes.component";
import { RecipeListComponent } from "./modul/recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./modul/recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./modul/recipes/recipe-list/recipe-item/recipe-item.component";
import { ShoppingListComponent } from "./modul/shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./modul/shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { RecipeServiseService } from "./core/services/recipe-servise.service";
import { AppRoutingModule } from "./app-routing.module";
import { ResipeStartComponent } from "./modul/recipes/resipe-start/resipe-start.component";
import { ResipeEditComponent } from "./modul/recipes/resipe-edit/resipe-edit.component";
import { ShopService } from "./core/services/recipe-shop.service";
import { DataStorageServiseService } from "./core/services/data-storage-servise.service";

import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './modul/auth/auth.component'
import { AuthServiceService } from "./core/services/auth-service.service";

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
    HttpClientModule
  ],
  providers: [RecipeServiseService, ShopService, DataStorageServiseService, AuthServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
