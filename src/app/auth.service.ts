import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserToken } from './user';
import * as moment from "moment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<HttpResponse<UserToken>> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: header, observe: 'response' };
    return this.http.post<UserToken>('http://localhost:8000/sso/login/', { email, password }, {headers: header, observe: 'response'});
  }

  public setSession(expiresIn, theToken) {
    const expiresAt = moment().add(expiresIn, 'second');

    localStorage.setItem('id_token', theToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
