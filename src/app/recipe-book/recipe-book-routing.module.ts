import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipeResolverService } from "../shared/recipe-resolver.service";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";

const routes: Routes = [
    {path: '', component: RecipeBookComponent, canActivate: [AuthGuardService], children: 
  [
    { path: '', component: SelectRecipeComponent},
    { path: 'new', component: EditRecipeComponent},
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
    { path: ':id/edit', component: EditRecipeComponent, resolve: [RecipeResolverService]}
  ]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeBookRoutingModule {

}