import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService) { }

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

    this.isLoading = true
    if(this.isLoginMode){
      //...
    }else{
      this.authService.signUp(email, password)
        .subscribe(resData => {
          this.isLoading = false;
          console.log(resData)
        },errorMessage =>{
          this.isLoading = false;
          console.log(errorMessage);
          this.error = errorMessage;
        });
   }
     form.reset();
  }

}
