import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imgPath: string;
    public ingredients: Array<Ingredient>;

    constructor(name: string, desc: string, imgPath: string, ingredients: Array<Ingredient>) {
        this.name = name;
        this.description = desc;
        this.imgPath = imgPath;
        this.ingredients = ingredients;
    }
}