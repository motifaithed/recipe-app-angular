import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects"
import { take, map, switchMap } from "rxjs/operators";
import {of} from "rxjs"

import { Recipe } from "./recipe.model";
import * as fromApp from "../store/app.reducer";
import * as RecipeActions from "../recipes/store/recipe.actions";


@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>   {

    
    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    return  this.store.select('recipes').pipe(take(1),map(recipeState =>{
            return recipeState.recipes;
        }),
        switchMap(recipes =>{
            if (recipes.length === 0){
                this.store.dispatch(new RecipeActions.FetchRecipes());
                return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES),take(1));
            }else{
                return of(recipes);
            }
        }));
        
        
        
    }
}