import {Ingredient} from "./ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingrediends: Ingredient[]

  constructor(name: string, desc: string, imagePath: string, ingrediends?: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingrediends = ingrediends;
  }
}