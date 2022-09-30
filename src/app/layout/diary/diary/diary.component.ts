import {Component, OnInit} from '@angular/core';
import {DiaryCommentDTO, DiaryDataDTO, DiaryDTO} from "../../../shared/interfaces/rest";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {DiaryService} from "../../../shared/services/diary.service";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {blobToImage, ConvertToLocaleDate} from "../../../shared/functions/shared-func";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {AuthService} from "../../../shared/services/auth.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  diaryMessageForm!: FormGroup;
  diaryMessage!: string;
  diaryMessages: DiaryCommentDTO[] = []
  diaryDataDTO: DiaryDataDTO;
  diaryId: number;

  constructor(private route: ActivatedRoute,
              private loaderService: NgxUiLoaderService,
              private diaryService: DiaryService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              public authService: AuthService,
              private notifier: NotifierService) {
    this.diaryDataDTO = {} as DiaryDataDTO;
    this.diaryId = Number(this.route.snapshot.paramMap.get('id'));
    this.diaryMessageForm = new FormGroup({
      message: new FormControl(this.diaryMessage, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loaderService.startLoader('app-body');
    this.initData().subscribe(([Diary, DiaryComments]) => {
      this.diaryDataDTO = Diary;
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

  get getDiaryMessage(){
    return this.diaryMessageForm.get('message');
  }

  convertToImage(blob: any): any {
    return blobToImage(blob);
  }

  getDate(date: Date): string {
    return ConvertToLocaleDate(date);
  }

  onSubmit(): void{
    if (!this.authService.isLoggedIn) {
      this.notifier.notify("error", "Для добавления сообщения вам необходимо быть авторизованным")
      return;
    }

    if (this.diaryMessageForm.valid) {
      this.diaryMessage = this.getDiaryMessage?.value;
      this.addMessage();
    } else {
      this.diaryMessageForm.reset();
    }
  }

  addMessage(): void{
    const token = this.tokenStorage.getUser();
    this.diaryService.addDiaryMessage(this.diaryId, token.id, this.diaryMessage).subscribe(() => {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }

}
