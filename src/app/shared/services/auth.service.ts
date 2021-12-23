import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {api} from "../constants/api";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(api.Gateway + api.Users + api.SignIn, {
      username,
      password
    }, httpOptions);
  }

  signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post(api.Gateway + api.Users + api.SignUp, {
      username,
      email,
      password
    }, httpOptions);
  }

}
