import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ForumService} from "../../../shared/services/forum.service";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {DiaryService} from "../../../shared/services/diary.service";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-new-diary',
  templateUrl: './new-diary.component.html',
  styleUrls: ['./new-diary.component.scss']
})
export class NewDiaryComponent implements OnInit {

  gameId: number;
  title!: string;
  text!: string;
  messageFormGroup!: FormGroup;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private tokenStorage: TokenStorageService) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.messageFormGroup = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      text: new FormControl(this.text, [Validators.required])
    })
  }

  get getTitle(): AbstractControl | null {
    return this.messageFormGroup.get('title');
  }

  get getText(): AbstractControl | null {
    return this.messageFormGroup.get('text');
  }

  onSubmit(): void {
    if (this.messageFormGroup.valid) {
      this.title = this.getTitle?.value;
      this.text = this.getText?.value;
      this.createNewTopic()
    } else {
      this.messageFormGroup.reset();
    }
  }

  createNewTopic() {
    const token = this.tokenStorage.getUser();
    this.userService.createDiary(token.id, this.gameId, this.title, this.text).subscribe(diary => {
      this.router.navigateByUrl("/diary/" + diary.id);
    });
  }
}
