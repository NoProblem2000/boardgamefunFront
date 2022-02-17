import {Component, OnInit} from '@angular/core';
import {ForumService} from "../../../shared/services/forum.service";
import {ForumDTO, ForumMessageDTO} from "../../../shared/interfaces/rest";
import {ActivatedRoute} from "@angular/router";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {blobToImage} from "../../../shared/functions/image-operations";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  public forumDTO: ForumDTO;
  private forumId: number;
  public forumMessagesDTO: ForumMessageDTO[] = [];

  constructor(private forumService: ForumService,
              private route: ActivatedRoute,
              private loaderService: NgxUiLoaderService) {

    this.forumDTO = {} as ForumDTO;
    this.forumId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loaderService.startLoader('app-body');
    this.initData().subscribe(([Forum, ForumMessagesDTO]) => {
        this.forumDTO = Forum;
        this.forumMessagesDTO = ForumMessagesDTO;
        this.loaderService.stopLoader('app-body');
      }
    )

  }

  getDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  private initData(): Observable<any> {
    return forkJoin([
      this.forumService.getForum(this.forumId).pipe(catchError(err => of(err))),
      this.forumService.getForumMessagesInGame(this.forumId).pipe(catchError(err => of(err)))
  ])
  }

  convertToImage(blob: any): any {
    return blobToImage(blob);
  }

}
