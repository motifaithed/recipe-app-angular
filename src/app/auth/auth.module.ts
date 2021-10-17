import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports:[
             CommonModule,
             FormsModule,
             RouterModule.forChild([{path: 'auth', component: AuthComponent}]), 
             SharedModule
            ]
})
export class AuthModule {
    
}