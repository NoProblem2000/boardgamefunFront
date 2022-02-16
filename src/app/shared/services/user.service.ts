import { Injectable } from '@angular/core';
import {HttpGlobalService} from "./http-global.service";
import {Observable} from "rxjs";
import {User, UserDTO} from "../interfaces/rest";
import {api} from "../constants/api";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpGlobalService) { }

  public getUsers(): Observable<User[]>{
    const url = `${api.Users}`;
    return this.httpService.get(url);
  }

  public getUser(id: number): Observable<UserDTO>{
    const url = `${api.Users}/${id}`;
    return this.httpService.get(url);
  }

  public getUserGames(userId: number){
    const url = `${api.Users}/${userId}/${api.Games}`;
    return this.httpService.get(url);
  }

  public getRatingList(userId: number){
    const url = `${api.Users}/${userId}/${api.GamesRating}`;
    return this.httpService.get(url);
  }

  public getGamesForSell(userId: number){
    const url = `${api.Users}/${userId}/${api.GamesToSell}`;
    return this.httpService.get(url);
  }

  public uploadAvatar(avatar: any, username: string){
    const url = `${api.Users}/${api.UserAvatar}/${username}`;
    return this.httpService.insert(url, avatar);
  }

}
