import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state.model';
import * as authActions from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(private fb:FormBuilder, private store: Store<AppState>, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm(){
    if(this.loginFormGroup.valid){
      // show loading
      this.authService.logIn(this.loginFormGroup.getRawValue()).then(resp => {
        if(!resp.error){
          this.router.navigate([`/dashboard`]);
        }
      })
    }
  }

  getEmailErrorMessage() {
    if (this.emailCtrl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailCtrl.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.passwordCtrl.hasError('required')) {
      return 'You must enter a value';
    }
  }

  get emailCtrl(){
    return this.loginFormGroup.controls['email'];
  }

  get passwordCtrl(){
    return this.loginFormGroup.controls['password'];
  }

}
