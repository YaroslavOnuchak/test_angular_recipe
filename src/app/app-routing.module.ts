import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./modul/recipes/recipes.component";
import {ShoppingListComponent} from "./modul/shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./modul/recipes/recipe-detail/recipe-detail.component";
import {ResipeStartComponent} from "./modul/recipes/resipe-start/resipe-start.component";
import {ResipeEditComponent} from "./modul/recipes/resipe-edit/resipe-edit.component";
import {RecipesResolverServise} from "./core/services/recipes-resolver.servise";
import {AuthComponent} from "./modul/auth/auth.component";
import {AuthGuard} from "./core/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: "full"},
  {path: 'auth', component: AuthComponent},
  {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ResipeStartComponent},
      {path: 'new', component: ResipeEditComponent},
      {
        path: ':id', component: RecipeDetailComponent,
        resolve: [RecipesResolverServise]
      },
      {
        path: ':id/edit', component: ResipeEditComponent,
        resolve: [RecipesResolverServise]
      },
    ]
  },
  {path: 'shopping', component: ShoppingListComponent}
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
