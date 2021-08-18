import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { RecipeServiseService } from "./core/services/recipe-servise.service";
import { AppRoutingModule } from "./app-routing.module";
import { ResipeStartComponent } from "./recipes/resipe-start/resipe-start.component";
import { ResipeEditComponent } from "./recipes/resipe-edit/resipe-edit.component";
import { ShopService } from "./core/services/RecipeShop/recipe-shop.service";
import { DataStorageServiseService } from "./shared/data-storage-servise.service";

import { HttpClientModule } from "@angular/common/http"

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
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RecipeServiseService, ShopService, DataStorageServiseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
