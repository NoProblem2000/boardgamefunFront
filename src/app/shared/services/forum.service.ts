import { Injectable } from '@angular/core';
import {HttpGlobalService} from "./http-global.service";
import {Observable} from "rxjs";
import {ForumDTO} from "../interfaces/rest";
import {api} from "../constants/api";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpGlobalService) { }

  public getForums(): Observable<ForumDTO[]>{
    const url = `${api.Forums}`;
    return this.http.get(url);
  }

  public getForumsByGame(gameId: number): Observable<ForumDTO[]>{
    const url = `${api.Forums}?gameId=${gameId}`;
    return this.http.get(url);
  }

  public getForumsByUser(userId: number){
    const url = `${api.Forums}?userId=${userId}`;
    return this.http.get(url);
  }

  public getForum(id: number): Observable<ForumDTO>{
    const url = `${api.Forums}/${id}`;
    return this.http.get(url);
  }

}
