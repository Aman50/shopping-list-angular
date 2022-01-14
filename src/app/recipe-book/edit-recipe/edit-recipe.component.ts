import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;
  storeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] * 1;
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  initForm(): void {
    let recipeName = '';
    let recipeURL = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => index === this.id)
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeURL = recipe.imgPath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for (const rec of recipe['ingredients']) {
            const recipeGroup = new FormGroup({
              name: new FormControl(rec.name, [Validators.required]),
              amount: new FormControl(rec.amount, [Validators.required, Validators.min(1)])
            });
            recipeIngredients.push(recipeGroup);
          }
        }
      this.recipeForm = new FormGroup({
        name: new FormControl(recipeName, [Validators.required]),
        imgPath: new FormControl(recipeURL, [Validators.required]),
        description: new FormControl(recipeDescription, [Validators.required]),
        ingredients: recipeIngredients
      });
    });
  }
  this.recipeForm = new FormGroup({
    name: new FormControl(recipeName, Validators.required),
    imgPath: new FormControl(recipeURL, Validators.required),
    description: new FormControl(recipeDescription, Validators.required),
    ingredients: recipeIngredients
  });
}

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(1)])
    }));
  }

  deleteIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  submitForm(): void {
    const recipe: Recipe = this.recipeForm.value;
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, recipe);
      this.store.dispatch(new RecipesActions.UpdateRecipe({recipeIndex: this.id, recipe: recipe}));
    } else {
      // this.recipeService.addRecipe(recipe);
      this.store.dispatch(new RecipesActions.AddRecipe(recipe));
    }
    this.resetAndNavigate();
  }

  cancel(): void {
    this.resetAndNavigate();
  }

  resetAndNavigate(): void {
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
