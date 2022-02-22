import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private authService: AuthService) { }

  signOut(): void {
    this.authService.isLoggedIn = false;
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public updateTokens(refreshToken: string, accessToken: string){
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, refreshToken);
    window.sessionStorage.setItem(TOKEN_KEY, accessToken);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

}
