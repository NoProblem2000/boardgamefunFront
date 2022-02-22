import {Component, Input, OnInit} from '@angular/core';
import {ForumDTO} from "../../../interfaces/rest";

@Component({
  selector: 'app-forums-list',
  templateUrl: './forums-list.component.html',
  styleUrls: ['./forums-list.component.scss', '../list-shared.scss']
})
export class ForumsListComponent implements OnInit {

  @Input() forums: ForumDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getTimePublication(forumData: ForumDTO){
    const d = forumData.forum.publicationTime;
    const date = new Date(d);
    return date.toLocaleDateString();
  }

}
