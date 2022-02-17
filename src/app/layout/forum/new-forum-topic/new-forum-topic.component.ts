import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-forum-topic',
  templateUrl: './new-forum-topic.component.html',
  styleUrls: ['./new-forum-topic.component.scss']
})
export class NewForumTopicComponent implements OnInit {


  title!: string;
  text!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
