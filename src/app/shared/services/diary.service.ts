import {Injectable} from '@angular/core';
import {HttpGlobalService} from "./http-global.service";
import {Observable} from "rxjs";
import {DiaryCommentDTO, DiaryDTO} from "../interfaces/rest";
import {api} from "../constants/api";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpGlobalService) {
  }

  public getDiaries(): Observable<DiaryDTO[]> {
    const url = `${api.Diary}`;
    return this.http.get(url);
  }

  public getGameDiaries(id: number): Observable<DiaryDTO[]> {
    const url = `${api.Diary}/?gameId=${id}`;
    return this.http.get(url);
  }

  public getUserDiaries(userId: number): Observable<DiaryDTO[]> {
    const url = `${api.Diary}/?userId=${userId}`;
    return this.http.get(url);
  }

  public getDiary(id: number): Observable<DiaryDTO> {
    const url = `${api.Diary}/${id}`;
    return this.http.get(url);
  }

  public getDiariesMessages(diaryId: number): Observable<DiaryCommentDTO[]> {
    const url = `${api.Diary}/${diaryId}/comments`;
    return this.http.get(url);
  }

  public addDiaryMessage(diaryId: number, userId: number, comment: string): Observable<DiaryCommentDTO[]> {
    const url = `${api.Diary}/${diaryId}/add-comment/${userId}`;
    return this.http.insert(url, {comment: comment});
  }
}
