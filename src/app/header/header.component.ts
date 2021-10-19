import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service';
import * as FromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private store: Store<FromApp.AppState>) { }
  ngOnInit(){
    this.userSub = this.store.select('auth').pipe(map(authState =>{
      return authState.user
    })).subscribe(
      user => {
        //this.isAuthenticated = !user ? false: true;
        this.isAuthenticated = !!user;
      }
    );
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onlogout(){
    
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
