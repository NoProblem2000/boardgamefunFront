import {Component, Input, OnInit} from '@angular/core';
import {blobToImage} from "../../../functions/shared-func";
import {GameDataDTO, GameDTO} from "../../../interfaces/rest";

@Component({
  selector: 'app-games-cards',
  templateUrl: './games-cards.component.html',
  styleUrls: ['./games-cards.component.scss', '../cards-style.scss']
})
export class GamesCardsComponent implements OnInit {

  @Input() gamesData: GameDataDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  convertToImage(blob: any){
    return blobToImage(blob);
  }

}
