import {Component, Input, OnInit} from '@angular/core';
import {ForumDataDTO, ForumDTO} from "../../../interfaces/rest";

@Component({
  selector: 'app-forums-cards',
  templateUrl: './forums-cards.component.html',
  styleUrls: ['./forums-cards.component.scss', '../cards-style.scss']
})
export class ForumsCardsComponent implements OnInit {

  @Input() forums: ForumDataDTO[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
