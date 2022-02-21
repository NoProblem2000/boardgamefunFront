import {Component, OnInit} from '@angular/core';
import {ForumService} from "../../../shared/services/forum.service";
import {ForumDTO, ForumMessageDTO} from "../../../shared/interfaces/rest";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {blobToImage, ConvertToLocaleDate} from "../../../shared/functions/shared-func";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {NotifierService} from "angular-notifier";
import {TokenStorageService} from "../../../shared/services/token-storage.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  messageFormGroup!: FormGroup;
  private message!: string;
  public forumDTO: ForumDTO;
  private forumId: number;
  public forumMessagesDTO: ForumMessageDTO[] = [];
  public editableMessage = false;
  public editableTopic = false;
  public currentEditableMessageId!: number | null;
  public token: any;

  //todo: edit only current message and make checks for this user(use id for both cases)

  constructor(private forumService: ForumService,
              private route: ActivatedRoute,
              private loaderService: NgxUiLoaderService,
              private authService: AuthService,
              private notifier: NotifierService,
              private tokenStorage: TokenStorageService,
              private router: Router) {

    this.forumDTO = {} as ForumDTO;
    this.forumId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.token = this.tokenStorage.getUser();
    this.messageFormGroup = new FormGroup({
      message: new FormControl(this.message, [Validators.required])
    });
    this.loaderService.startLoader('app-body');
    this.initData().subscribe(([Forum, ForumMessagesDTO]) => {
        this.forumDTO = Forum;
        this.forumMessagesDTO = ForumMessagesDTO;
        this.loaderService.stopLoader('app-body');
      }
    )

  }

  onSubmit(): void {
    if (!this.authService.isLoggedIn) {
      this.notifier.notify("error", "Для добавления сообщения вам необходимо быть авторизованным")
      return;
    }
    if (this.messageFormGroup.valid) {
      this.message = this.getMessage?.value;
      this.addMessage();
    } else {
      this.messageFormGroup.reset();
    }

  }

  get getMessage() {
    return this.messageFormGroup.get('message');
  }

  addMessage(): void {
    this.forumService.addForumMessage(this.forumId, this.token.id, this.message).subscribe(() => {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });

  }

  getDate(date: Date): string {
    return ConvertToLocaleDate(date);
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

  saveEditsInTopic(): void {
    this.editableTopic = false;
  }

  deleteTopic(): void {

  }

  deleteMessage(): void {

  }

  saveEditsInMessage(): void {
    this.currentEditableMessageId = null;
    this.editableMessage = false;
  }

  editMessage(): void {
    this.editableMessage = true;
  }

  editTopic(): void {
    this.editableTopic = true;
  }


}
