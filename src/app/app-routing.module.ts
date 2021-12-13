import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { EditRecipeComponent } from './recipe-book/edit-recipe/edit-recipe.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { SelectRecipeComponent } from './recipe-book/select-recipe/select-recipe.component';
import { RecipeResolverService } from './shared/recipe-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipe-book', pathMatch: 'full'},
  {path: 'recipe-book', component: RecipeBookComponent, canActivate: [AuthGuardService], children: 
  [
    { path: '', component: SelectRecipeComponent},
    { path: 'new', component: EditRecipeComponent},
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
    { path: ':id/edit', component: EditRecipeComponent, resolve: [RecipeResolverService]}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
