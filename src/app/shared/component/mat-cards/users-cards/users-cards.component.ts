import {Component, Input, OnInit} from '@angular/core';
import {UserDTO} from "../../../interfaces/rest";
import {blobToImage} from "../../../functions/shared-func";

@Component({
  selector: 'app-users-cards',
  templateUrl: './users-cards.component.html',
  styleUrls: ['./users-cards.component.scss', '../cards-style.scss']
})
export class UsersCardsComponent implements OnInit {

  @Input() users: UserDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  convertToImage(blob: any){
    return blobToImage(blob);
  }

}
