import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects"
import { take } from "rxjs/operators";

import { Recipe } from "./recipe.model";
import * as fromApp from "../store/app.reducer";
import * as RecipeActions from "../recipes/store/recipe.actions";


@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>   {

    // constructor(private dataStorageService: DataStorageService,
    //             private recipeService: RecipeService){

    // }
    constructor(private store: Store<fromApp.AppState>,
                private actionsS: Actions ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        //return this.dataStorageService.fetchRecipes();
        // const recipes = this.recipeService.getRecipes();
        // if(recipes.length === 0){
        //     return this.dataStorageService.fetchRecipes();
        // }else{
        //     return recipes;
        // }
        this.store.dispatch(new RecipeActions.FetchRecipes());
        return this.actionsS.pipe(ofType(RecipeActions.SET_RECIPES),take(1));
    }
}