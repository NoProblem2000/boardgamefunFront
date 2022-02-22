import {Component, OnInit} from '@angular/core';
import {GameService} from "../../shared/services/game.service";
import {FilterGamesDTO} from "../../shared/interfaces/rest";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  filteredGames: FilterGamesDTO[] = [];


  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  applyFilter(event: any): void {
    const filter = event.target.value;
    if (filter !== "") {
      this.gameService.getGamesByFilter(filter).subscribe(res => {
        this.filteredGames = res;
      });
    }
  }
}
