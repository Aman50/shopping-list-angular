import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  recipeIndex: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
      this.recipeIndex = params['id'] * 1;
      return this.store.select('recipes');
    }), map(recipeState => recipeState.recipes)).subscribe(recipe => {
      this.recipe = recipe.find((recipe, index) => index === this.recipeIndex);
    });
  }

  sendToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipeIndex);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeIndex));
    this.router.navigate(['/recipe-book'])
  }

}
