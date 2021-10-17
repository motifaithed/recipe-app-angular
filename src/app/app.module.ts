import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { AppRoutingModule } from './app-routing-module';

import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';

import { AuthInterceptor } from './auth/auth-interceptor.service';


import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule
  ],
  providers: [ShoppingListService,
              RecipeService, 
              {provide: HTTP_INTERCEPTORS, 
               useClass: AuthInterceptor, 
               multi: true}
              ],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
