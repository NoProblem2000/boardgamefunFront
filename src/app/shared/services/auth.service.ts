import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {api} from "../constants/api";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient) {
  }

  signIn(name: string, password: string): Observable<any> {
    return this.http.post(api.Gateway + '/' + api.Users + '/' + api.SignIn, {
      name,
      password
    }, httpOptions);
  }

  signUp(name: string, password: string, mail: string, town: string): Observable<any> {
    return this.http.post(api.Gateway + '/' + api.Users + '/' + api.SignUp, {
      name,
      password,
      mail,
      town
    }, httpOptions);
  }

}
