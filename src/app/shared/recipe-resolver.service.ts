import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipe-book/recipe.model";
import { RecipeService } from "../recipe-book/recipe.service";
import { DataStorageService } from "./data-storage.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length > 0) {
            return recipes;
        } else {
            return this.dataStorageService.fetchRecipes();
        }
    }
}