import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../auth.service';
import { UserToken } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  token: UserToken;

  info: string;
  constructor(private fb: FormBuilder,
              private authService: AuthService
            ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.form.get('email').value, this.form.get('password').value)
        .subscribe(token => this.info = token.token);
  }

}
