import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeBookRoutingModule } from "./recipe-book-routing.module";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";

@NgModule({
    declarations: [
        RecipeBookComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        SelectRecipeComponent,
        EditRecipeComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        RecipeBookRoutingModule,
        SharedModule
    ]
})
export class RecipeBookModule {

}