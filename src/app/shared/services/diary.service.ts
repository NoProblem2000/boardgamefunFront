import { Injectable } from '@angular/core';
import {HttpGlobalService} from "./http-global.service";
import {Observable} from "rxjs";
import {DiaryDTO} from "../interfaces/rest";
import {api} from "../constants/api";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpGlobalService) { }

  public getDiaries(): Observable<DiaryDTO[]>{
    const url = `${api.Diary}`;
    return this.http.get(url);
  }

  public getGameDiaries(id: number): Observable<DiaryDTO[]>{
    const url = `${api.Diary}/?gameId=${id}`;
    return this.http.get(url);
  }

  public getDiary(id: number): Observable<DiaryDTO>{
    const url = `${api.Diary}/${id}`;
    return this.http.get(url);
  }

}
