import {Component, OnInit} from '@angular/core';
import {DiaryCommentDTO, DiaryDTO} from "../../../shared/interfaces/rest";
import {ActivatedRoute} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {DiaryService} from "../../../shared/services/diary.service";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {blobToImage, ConvertToLocaleDate} from "../../../shared/functions/shared-func";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  diaryMessageFrom!: FormGroup;
  diaryMessage!: string;
  diaryMessages: DiaryCommentDTO[] = []
  diaryDTO: DiaryDTO;
  diaryId: number;

  constructor(private route: ActivatedRoute,
              private loaderService: NgxUiLoaderService,
              private diaryService: DiaryService) {
    this.diaryDTO = {} as DiaryDTO;
    this.diaryId = Number(this.route.snapshot.paramMap.get('id'));
    this.diaryMessageFrom = new FormGroup({
      diaryMessage: new FormControl(this.diaryMessage, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loaderService.startLoader('app-body');
    this.initData().subscribe(([Diary, DiaryComments]) => {
      this.diaryDTO = Diary;
      this.diaryMessages = DiaryComments;
      this.loaderService.stopLoader('app-body');
    });
  }

  initData(): Observable<any> {
    return forkJoin([
      this.diaryService.getDiary(this.diaryId).pipe(catchError(err => of(err))),
      this.diaryService.getDiariesMessages(this.diaryId).pipe(catchError(err => of(err)))
    ])
  }

  convertToImage(blob: any): any {
    return blobToImage(blob);
  }

  getDate(date: Date): string {
    return ConvertToLocaleDate(date);
  }

}
