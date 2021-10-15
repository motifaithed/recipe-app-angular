import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpClient){

    }
    signUp(email: string, password: string){
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1FgdDpAPG69qaWLvaIHgerbRDQam9GGg',{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }
    login(email: string, password: string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1FgdDpAPG69qaWLvaIHgerbRDQam9GGg',{
        email: email,
        password: password,
        returnSecureToken: true
    }).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse){
        
            let errorMessage = "an unknown error occured";
            if(!errorRes.error || !errorRes.error.error ){
                return throwError(errorMessage);
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
            return throwError(errorMessage);
        
    }
}