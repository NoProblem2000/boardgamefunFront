import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor(private route: ActivatedRoute,) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.messageFormGroup = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      text: new FormControl(this.text, [Validators.required])
    })
  }

  get getTitle(): AbstractControl | null{
    return this.messageFormGroup.get('title');
  }

  get getText(): AbstractControl | null{
    return this.messageFormGroup.get('text');
  }

  onSubmit(): void{
    if (this.messageFormGroup.valid){
      this.title = this.getTitle?.value;
      this.text = this.getText?.value;
      this.createNewTopic()
    } else{
      this.messageFormGroup.reset();
    }
  }

  createNewTopic(){
  }

}
