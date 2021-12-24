import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {GameService} from "../../shared/services/game.service";
import {DiaryService} from "../../shared/services/diary.service";
import {ForumService} from "../../shared/services/forum.service";
import {DiariesWithRatingsProjection, ForumProjection, GameDTO, User} from "../../shared/interfaces/rest";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public users: User[] = [];
  public games: GameDTO[] = [];
  public diaries: DiariesWithRatingsProjection[] = [];
  public forums: ForumProjection[] = [];

  constructor(private userService: UserService,
              private gameService: GameService,
              private diaryService: DiaryService,
              private forumService: ForumService,
              private loaderService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.startLoader('main-page');
    this.initData().subscribe(([Users, Games, Diaries, Forums]) => {
        this.users = Users;
        this.games = Games;
        this.diaries = Diaries;
        this.forums = Forums;
        this.loaderService.stopLoader('main-page');
      },
      (error) => console.log(error));
  }

  private initData(): Observable<any> {
    return forkJoin([this.userService.getUsers().pipe(catchError(err => of(err))),
      this.gameService.getGames().pipe(catchError(err => of(err))),
      this.diaryService.getDiaries().pipe(catchError(err => of(err))),
      this.forumService.getForums().pipe(catchError(err => of(err)))])
  }

}
