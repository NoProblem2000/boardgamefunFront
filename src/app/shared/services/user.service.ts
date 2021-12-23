import { Injectable } from '@angular/core';
import {HttpGlobalService} from "./http-global.service";
import {Observable} from "rxjs";
import {User} from "../interfaces/rest";
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

  public getUser(id: number): Observable<User>{
    const url = `${api.Users}/${id}`;
    return this.httpService.get(url);
  }

}
