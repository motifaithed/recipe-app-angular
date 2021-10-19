import { HttpClient } from "@angular/common/http";
import { Actions,Effect,ofType } from "@ngrx/effects";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import * as AuthActions from './auth.actions';
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START)
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap(
            (authData: AuthActions.LoginStart) =>{
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,{
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(map(resData => {

                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn*1000);
                    return  new AuthActions.AuthenticateSuccess({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    });
                }),catchError(errorRes =>{
                    //...
                    let errorMessage = "an unknown error occured";
                    if(!errorRes.error || !errorRes.error.error ){
                        return of(new AuthActions.AuthenticateFail(errorMessage));
                    }
                    switch(errorRes.error.error.message){
                        case 'EMAIL_EXISTS':
                        errorMessage = "This email already exists!";
                        break;
                        case 'INVALID_PASSWORD':
                        errorMessage = "You have entered a wrong password! Please try again.";
                        break;
                        case 'USER_DISABLED':
                        errorMessage = "User was disabled!";
                        break;
                    }
                    return of(new AuthActions.AuthenticateFail(errorMessage));
                }))
            }
        )
    )
    
    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),tap(
            () => {
                this.router.navigate(['/']);
            }
        )
    );
    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router){}
}