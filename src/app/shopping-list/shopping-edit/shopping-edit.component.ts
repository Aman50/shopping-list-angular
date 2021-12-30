import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  mode: 'edit' | 'create';
  editIndexSubscription: Subscription;
  // editIndex: number;
  editIngredient: Ingredient;

  @ViewChild('shoppingForm', {static: true})
  shoppingForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.editIndexSubscription = this.store.select('shoppingList').subscribe(state => {
      if (state.editIngredientIndex > -1) {
        this.mode = 'edit';
        // this.editIndex = state.editIngredientIndex;
        this.editIngredient = state.editIngredient;
        this.shoppingForm.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.amount,
      });
      }
    });
    // this.editIndexSubscription = this.shoppingListService.emitEditItemIndex.subscribe((index: number) => {
    //   this.mode = 'edit';
    //   this.editIndex = index;
    //   this.editIngredient = this.shoppingListService.getIngredient(index);
    //   this.shoppingForm.setValue({
    //     name: this.editIngredient.name,
    //     amount: this.editIngredient.amount,
    //   });
    // });
  }

  addIngredient(name: string, amount: number) {
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  submitForm(form: NgForm): void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.mode === 'edit') {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
      // this.shoppingListService.updateIngredient(newIngredient, this.editIndex);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm();
  }

  resetForm(): void {
    this.shoppingForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.mode = 'create';
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    // this.shoppingListService.deleteIngredient(this.editIndex);
    this.resetForm();
  }

  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editIndexSubscription.unsubscribe();
  }

}
