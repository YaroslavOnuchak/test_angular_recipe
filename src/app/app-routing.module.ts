import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {ResipeStartComponent} from "./recipes/resipe-start/resipe-start.component";
import {ResipeEditComponent} from "./recipes/resipe-edit/resipe-edit.component";

const routes: Routes = [
  {path: 'recipes', component: RecipesComponent,
  children:[
    {path:'', component:ResipeStartComponent},
    {path:'new', component:ResipeEditComponent},
    {path:':id', component:RecipeDetailComponent},
    {path:':id/edit', component:ResipeEditComponent},
  ]
  },
  {path: 'shopping', component: ShoppingListComponent},
  {path: '', redirectTo: 'recipes', pathMatch: "full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
