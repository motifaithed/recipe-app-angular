import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
      if(form.invalid){
        return;
      }
      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true
      if(this.isLoginMode){
      authObs =  this.authService.login(email, password);
          
      }else{
        authObs = this.authService.signUp(email, password);
      
      }

    authObs.subscribe(resData => {
      this.isLoading = false;
      console.log(resData);
      this.router.navigate(['/recipes']);

    },errorMessage =>{
      this.isLoading = false;
      console.log(errorMessage);
      this.error = errorMessage;

    });
      
    form.reset();

  }

  onHandleError(){
    this.error = null;
  }
}
