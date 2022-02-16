import {Component, Input, OnInit} from '@angular/core';
import {GameDTO} from "../../../interfaces/rest";

@Component({
  selector: 'app-games-rating-list',
  templateUrl: './games-rating-list.component.html',
  styleUrls: ['./games-rating-list.component.scss']
})
export class GamesRatingListComponent implements OnInit {

  @Input() gamesData: GameDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
