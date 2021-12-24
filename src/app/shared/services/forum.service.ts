import { Injectable } from '@angular/core';
import {HttpGlobalService} from "./http-global.service";
import {Observable} from "rxjs";
import {ForumProjection} from "../interfaces/rest";
import {api} from "../constants/api";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpGlobalService) { }

  public getForums(): Observable<ForumProjection[]>{
    const url = `${api.Forums}`;
    return this.http.get(url);
  }

  public getForum(id: number): Observable<ForumProjection>{
    const url = `${api.Forums}/${id}`;
    return this.http.get(url);
  }

}
