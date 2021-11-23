import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  mode: 'edit' | 'create';
  editIndexSubscription: Subscription;
  editIndex: number;
  editIngredient: Ingredient;

  @ViewChild('shoppingForm', {static: true})
  shoppingForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editIndexSubscription = this.shoppingListService.emitEditItemIndex.subscribe((index: number) => {
      this.mode = 'edit';
      this.editIndex = index;
      this.editIngredient = this.shoppingListService.getIngredient(index);
      this.shoppingForm.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.amount,
      });
    });
  }

  addIngredient(name: string, amount: number) {
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  submitForm(form: NgForm): void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.mode === 'edit') {
      this.shoppingListService.updateIngredient(newIngredient, this.editIndex);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm();
  }

  resetForm(): void {
    this.shoppingForm.reset();
    this.mode = 'create';
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.resetForm();
  }

  ngOnDestroy(){
    this.editIndexSubscription.unsubscribe();
  }

}
