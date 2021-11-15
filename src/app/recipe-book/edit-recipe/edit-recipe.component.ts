import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Params } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] * 1;
      this.editMode = params['id'] !== undefined;
    });
  }

}
