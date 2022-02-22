import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ForumService} from "../../../shared/services/forum.service";
import {DiaryService} from "../../../shared/services/diary.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {DiaryDTO, ForumDTO, GameDTO, UserDTO} from "../../../shared/interfaces/rest";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {blobToImage} from "../../../shared/functions/shared-func";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userId: number;
  userDTO: UserDTO;
  forums: ForumDTO[] = [];
  diaries: DiaryDTO[] = [];
  userRatingList: GameDTO[] = [];
  userGames: GameDTO[] = [];
  gamesForSell: GameDTO[] = [];


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private forumService: ForumService,
              private diaryService: DiaryService,
              private loaderService: NgxUiLoaderService) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userDTO = {} as UserDTO;
  }

  ngOnInit(): void {
    this.loaderService.startLoader('app-body');
    this.initData().subscribe(([User, Forums, Diaries, UserGames, GamesForSell, RatingList]) => {
        this.userDTO = User;
        this.forums = Forums;
        this.diaries = Diaries;
        this.userGames = UserGames;
        this.gamesForSell = GamesForSell;
        this.userRatingList = RatingList;
        this.loaderService.stopLoader('app-body');
      },
      (error) => {
        this.loaderService.stopLoader('app-body');
        console.log(error)
      });
  }

  private initData(): Observable<any> {
    return forkJoin([
      this.userService.getUser(this.userId).pipe(catchError(err => of(err))),
      this.forumService.getForumsByUser(this.userId).pipe(catchError(err => of(err))),
      this.diaryService.getUserDiaries(this.userId).pipe(catchError(err => of(err))),
      this.userService.getUserGames(this.userId).pipe(catchError(err => of(err))),
      this.userService.getGamesForSell(this.userId).pipe(catchError(err => of(err))),
      this.userService.getRatingList(this.userId).pipe(catchError(err => of(err))),
    ])
  }

  getDate(): string{
    const d = this.userDTO.user.registrationDate;
    const date = new Date(d);
    return date.toLocaleDateString();
  }

  public convertToImage(blob: any){
    return blobToImage(blob);
  }

}
