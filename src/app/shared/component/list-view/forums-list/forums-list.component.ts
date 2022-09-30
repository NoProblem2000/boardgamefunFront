import {Component, Input, OnInit} from '@angular/core';
import {ForumDataDTO, ForumDTO} from "../../../interfaces/rest";

@Component({
  selector: 'app-forums-list',
  templateUrl: './forums-list.component.html',
  styleUrls: ['./forums-list.component.scss', '../list-shared.scss']
})
export class ForumsListComponent implements OnInit {

  @Input() forums: ForumDataDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getTimePublication(forumDTO: ForumDTO){
    const d = forumDTO.publicationTime;
    const date = new Date(d);
    return date.toLocaleDateString();
  }

}
