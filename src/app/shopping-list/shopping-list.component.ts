import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Array<Ingredient>;
  ingredientObservable: Observable<{ ingredients: Ingredient[] }>;
  // emitIngredientsSubscription: Subscription
  ;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: { ingredients: Ingredient[] }}>
    ) { }

  ngOnInit(): void {
    this.ingredientObservable = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.emitIngredientsSubscription = this.shoppingListService.emitIngredients.subscribe((data: Array<Ingredient>) => {
    // this.ingredients = data;
    // });
  }

  startEditing(index: number) {
    this.shoppingListService.emitEditItemIndex.next(index);
  }

  ngOnDestroy(): void {
    // this.emitIngredientsSubscription.unsubscribe();
  }

}
