import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {GameService} from "../../shared/services/game.service";
import {DiaryService} from "../../shared/services/diary.service";
import {ForumService} from "../../shared/services/forum.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private userService: UserService,
              private gameService: GameService,
              private diaryService: DiaryService,
              private forumService: ForumService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      console.log(res)
    }, (err) => { console.log(err);
    });

    this.gameService.getGames().subscribe((res) => {
      console.log(res)
    }, (err) => { console.log(err);
    });

    this.diaryService.getDiaries().subscribe((res) => {
      console.log(res)
    }, (err) => { console.log(err);
    });

    this.forumService.getForums().subscribe((res) => {
      console.log(res)
    }, (err) => { console.log(err);
    });

  }

}
