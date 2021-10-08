import { Injectable} from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
@Injectable({providedIn: 'root'})

export class ShoppingListService{

    ingredientChange = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('apple', 5),
        new Ingredient('tomatoes', 10)
      ];
    
    getIngredients(){
        
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){

       this.ingredients.push(ingredient);
       this.ingredientChange.next(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){

        this.ingredients.push(...ingredients);
        this.ingredientChange.next(this.ingredients.slice());

    }
}