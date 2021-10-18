import { NgModule } from "@angular/core";

import { RecipeService } from "./recipes/recipe.service";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    providers: [
        RecipeService, 
        {provide: HTTP_INTERCEPTORS, 
         useClass: AuthInterceptor, 
         multi: true}
        ]
})
export class CoreModule{

}