import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
@Injectable({providedIn: 'root'})

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
                   'This is simply a test',
                   'https://www.seriouseats.com/thmb/EZaQnk1yjGYVIkASseEWqtFRHyc=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__05__Anova-Steak-Guide-Sous-Vide-Photos15-beauty-159b7038c56a4e7685b57f478ca3e4c8.jpg',
                   [new Ingredient('Burger', 5),
                    new Ingredient('Meat', 10)]),
        new Recipe('A Test Recipe 2',
                   'This is simply a test 2',
                   'https://images-gmi-pmc.edge-generalmills.com/b57ee35f-bce2-4229-8bf5-19b97876a4cb.jpg',
                   [new Ingredient('Patti', 5),
                    new Ingredient('Cheese', 10)])
      ];
constructor(private shoppingListService: ShoppingListService){

}
 getRecipes(){
    return this.recipes.slice();
 }
 
 addIngredientsToShoppingList(ingredients: Ingredient[]){

    this.shoppingListService.addIngredients(ingredients);
 }
 
}