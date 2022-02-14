import {Component, OnInit} from '@angular/core';
import {GameService} from "../../../shared/services/game.service";
import {ActivatedRoute} from "@angular/router";
import {ForumDTO, GameDTO} from "../../../shared/interfaces/rest";
import {blobToImage} from "../../../shared/functions/image-operations";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {ForumService} from "../../../shared/services/forum.service";
import {DiaryService} from "../../../shared/services/diary.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public gameData: GameDTO;
  public expansionsGames: GameDTO[] = [];
  public similarGames: GameDTO[] = [];
  public forums: ForumDTO[] = [];

  gameId: number = 0;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private forumService: ForumService,
              private diaryService: DiaryService,
              private loaderService: NgxUiLoaderService) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameData = {} as GameDTO;
  }

  ngOnInit(): void {

    this.loaderService.startLoader('app-body');
    this.initData().subscribe(([Game, Forums, SimilarGames, Expansions]) => {
        this.gameData = Game;
        this.forums = Forums;
        this.similarGames = SimilarGames;
        this.expansionsGames = Expansions;
        this.loaderService.stopLoader('app-body');
      },
      (error) => {
        this.loaderService.stopLoader('app-body');
        console.log(error)
      });
  }

  getYear(): number{
    const d = this.gameData.game.yearOfRelease;
    const date = new Date(d);
    return date.getFullYear();
  }

  private initData(): Observable<any> {
    return forkJoin([
      this.gameService.getGame(this.gameId).pipe(catchError(err => of(err))),
      this.forumService.getForumsByGame(this.gameId).pipe(catchError(err => of(err))),
      this.gameService.getSimilarGames(this.gameId).pipe(catchError(err => of(err))),
      this.gameService.getExpansions(this.gameId).pipe(catchError(err => of(err)))])
  }

  convertImage(blob: any) {
    return blobToImage(blob);
  }

}
