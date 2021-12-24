import { Injectable } from '@angular/core';
import {HttpGlobalService} from "./http-global.service";
import {Observable} from "rxjs";
import {DiariesWithRatingsProjection} from "../interfaces/rest";
import {api} from "../constants/api";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpGlobalService) { }

  public getDiaries(): Observable<DiariesWithRatingsProjection[]>{
    const url = `${api.Diary}`;
    return this.http.get(url);
  }

  public getDiary(id: number): Observable<DiariesWithRatingsProjection>{
    const url = `${api.Diary}/${id}`;
    return this.http.get(url);
  }

}
