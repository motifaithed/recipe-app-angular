import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  
  
    ingredients: Observable<{ingredients: Ingredient[]}>
    
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList:{ingredients:Ingredient[]}}>) { }

  ngOnInit(): void {
    
    //we don't need to unsubscribe..angular does it on store and reducers
    this.ingredients = this.store.select('shoppingList');
    

  }
  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(){
    
  }

}
