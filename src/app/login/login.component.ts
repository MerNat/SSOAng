import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../auth.service';
import { UserToken } from '../user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  theToken: UserToken;
  info: string;
  error: HttpErrorResponse;
  emailInput = 'form-control';
  passwordInput = 'form-control';
  constructor(private fb: FormBuilder,
              private authService: AuthService
            ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.form.get('email').value, this.form.get('password').value)
            .subscribe(data => {
              this.theToken = data.body;
              console.log('Login Status: ' + data.status + ' Token: ' + this.theToken.token);
            }, error => {
                this.error = error;
                if (this.error.status === 400) {
                  this.emailInput = 'form-control is-invalid';
                  this.passwordInput = 'form-control is-invalid';
                  console.log('Login Error: ' + this.error.status);
                }
            });
  }

}
