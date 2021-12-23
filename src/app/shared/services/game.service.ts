import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GameDTO} from "../interfaces/rest";
import {api} from "../constants/api";
import {HttpGlobalService} from "./http-global.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpService: HttpGlobalService) { }

  public getGames(): Observable<GameDTO[]>{
    const url = `${api.Games}`;
    return this.httpService.get(url);
  }

  public getGame(id: number): Observable<GameDTO>{
    const url = `${api.Games}/${api.GameById}/${id}`;
    return this.httpService.get(url);
  }
}
