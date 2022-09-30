import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ForumService} from "../../../shared/services/forum.service";
import {TokenStorageService} from "../../../shared/services/token-storage.service";

@Component({
  selector: 'app-new-forum-topic',
  templateUrl: './new-forum-topic.component.html',
  styleUrls: ['./new-forum-topic.component.scss']
})
export class NewForumTopicComponent implements OnInit {

  gameId: number;
  title!: string;
  text!: string;
  messageFormGroup!: FormGroup;

  constructor(private route: ActivatedRoute,
              private forumService: ForumService,
              private router: Router,
              private tokenStorage: TokenStorageService) {
    this.gameId = Number(this.route.snapshot.paramMap.get('gameId'));
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
    this.forumService.addForum(token.id, this.gameId, this.title, this.text).subscribe(forum => {
      this.router.navigateByUrl("/forum/" + forum.id);
    });
  }

}
