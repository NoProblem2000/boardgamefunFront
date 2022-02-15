import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {GameDTO} from "../interfaces/rest";
import {api} from "../constants/api";
import {HttpGlobalService} from "./http-global.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpService: HttpGlobalService) {
  }

  public getGames(): Observable<GameDTO[]> {
    const url = `${api.Games}`;
    return this.httpService.get(url);
  }

  public getGame(id: number): Observable<GameDTO> {
    const url = `${api.Games}/${api.GameById}/${id}`;
    return this.httpService.get(url);
  }

  public getSimilarGames(id: number) {
    const url = `${api.Games}/${api.SimilarGames}/${id}`;
    return this.httpService.get(url);
  }

  public getExpansions(id: number) {
    const url = `${api.Games}/${api.Expansions}/${id}`;
    return this.httpService.get(url);
  }

  public uploadImage(picture: any, gameId: number) {
    const url = `${api.Games}/${api.GameAvatar}/${gameId}`;
    return this.httpService.insert(url, picture);
  }

  public addGame(title: string,
                 yearOfRelease: Date,
                 annotation: string,
                 description: string,
                 playerAge: string,
                 playersMin: number,
                 playersMax: number,
                 timeToPlayMin: number,
                 timeToPlayMax: number) {
    return this.httpService.insert(`${api.Games}/${api.AddGame}`, {
      title,
      yearOfRelease,
      annotation,
      description,
      playerAge,
      playersMin,
      playersMax,
      timeToPlayMin,
      timeToPlayMax
    });
  }
}
