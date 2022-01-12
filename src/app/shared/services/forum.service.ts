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

  public getForum(id: number): Observable<ForumDTO>{
    const url = `${api.Forums}/${id}`;
    return this.http.get(url);
  }

}
