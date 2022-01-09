import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe>;
  recipeSubscription: Subscription;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.store.select('recipes').pipe(
      map(recipeState => recipeState.recipes)
    ).subscribe((recipeArray: Recipe[]) => {
      this.recipes = recipeArray;
    });
  }

  addNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

}
