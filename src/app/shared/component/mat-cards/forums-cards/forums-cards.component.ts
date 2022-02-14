import {Component, Input, OnInit} from '@angular/core';
import {ForumDTO} from "../../../interfaces/rest";

@Component({
  selector: 'app-forums-cards',
  templateUrl: './forums-cards.component.html',
  styleUrls: ['./forums-cards.component.scss', '../cards-style.scss']
})
export class ForumsCardsComponent implements OnInit {

  @Input() forums: ForumDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
