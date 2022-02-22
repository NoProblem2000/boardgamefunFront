import {Component, Input, OnInit} from '@angular/core';
import {DiaryDTO} from "../../../interfaces/rest";

@Component({
  selector: 'app-diary-cards',
  templateUrl: './diary-cards.component.html',
  styleUrls: ['./diary-cards.component.scss', '../cards-style.scss']
})
export class DiaryCardsComponent implements OnInit {

  @Input() diaries: DiaryDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
