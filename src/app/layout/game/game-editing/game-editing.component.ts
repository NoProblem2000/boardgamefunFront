import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ComponentCanDeactivate} from "../../../shared/guards/save-data.guard";
import {Observable} from "rxjs";
import {GameService} from "../../../shared/services/game.service";
import {NotifierService} from "angular-notifier";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-editing',
  templateUrl: './game-editing.component.html',
  styleUrls: ['./game-editing.component.scss']
})
export class GameEditingComponent implements OnInit, ComponentCanDeactivate {

  gameFormGroup!: FormGroup;
  title!: string;
  yearOfRelease!: Date;
  annotation!: string;
  description!: string;
  picture!: any;
  playerAge!: string;
  playersMin!: number;
  playersMax!: number;
  timeToPlayMin!: number;
  timeToPlayMax!: number;

  constructor(private gameService: GameService,
              private notifier: NotifierService,
              private loaderService: NgxUiLoaderService,
              private router: Router) {
  }

  get getTitle(): AbstractControl | null {
    return this.gameFormGroup.get('title');
  }

  get getYearOfRelease(): AbstractControl | null {
    return this.gameFormGroup.get('yearOfRelease');
  }

  get getAnnotation(): AbstractControl | null {
    return this.gameFormGroup.get('annotation');
  }

  get getDescription(): AbstractControl | null {
    return this.gameFormGroup.get('description');
  }

  get getPlayerAge(): AbstractControl | null {
    return this.gameFormGroup.get('playerAge');
  }

  get getPlayersMin(): AbstractControl | null {
    return this.gameFormGroup.get('playersMin');
  }

  get getPlayersMax(): AbstractControl | null {
    return this.gameFormGroup.get('playersMax');
  }

  get getTimeToPlayMin(): AbstractControl | null {
    return this.gameFormGroup.get('timeToPlayMin');
  }

  get getTimeToPlayMax(): AbstractControl | null {
    return this.gameFormGroup.get('timeToPlayMax');
  }

  get getPicture(): AbstractControl | null {
    return this.gameFormGroup.get('picture');
  }


  ngOnInit(): void {
    this.gameFormGroup = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      yearOfRelease: new FormControl(this.yearOfRelease, [Validators.required]),
      annotation: new FormControl(this.annotation, [Validators.required]),
      description: new FormControl(this.description, [Validators.required]),
      playerAge: new FormControl(this.playerAge, [Validators.required]),
      timeToPlayMax: new FormControl(this.timeToPlayMax, [Validators.required]),
      timeToPlayMin: new FormControl(this.timeToPlayMin, [Validators.required]),
      playersMax: new FormControl(this.playersMax, [Validators.required]),
      playersMin: new FormControl(this.playersMin, [Validators.required]),
      picture: new FormControl(this.picture),
    });
  }

  onSubmit(): void {
    if (this.gameFormGroup.valid) {
      this.title = this.getTitle?.value;
      this.yearOfRelease = this.getYearOfRelease?.value;
      this.annotation = this.getAnnotation?.value;
      this.description = this.getDescription?.value;
      this.playerAge = this.getPlayerAge?.value;
      this.playersMin = this.getPlayersMin?.value;
      this.playersMax = this.getPlayersMax?.value;
      this.timeToPlayMin = this.getTimeToPlayMin?.value;
      this.timeToPlayMax = this.getTimeToPlayMax?.value;
      const imageData = new FormData();
      imageData.append('picture', this.getPicture?.value.files[0]);
      this.picture = imageData;
      this.addGame();
    } else {
      this.gameFormGroup.reset();
    }
  }

  addGame(): void {
    this.loaderService.startLoader("app-body");
    this.gameService.addGame(this.title, this.yearOfRelease, this.annotation, this.description,
      this.playerAge, this.playersMin, this.playersMax, this.timeToPlayMin, this.timeToPlayMax).subscribe(
      res => {
        this.gameService.uploadImage(this.picture, res.game.id).subscribe(
          res => {
            this.loaderService.stopLoader('app-body');
            this.notifier.notify("success", 'Игра сохранена');
            this.router.navigateByUrl(`/game/${res.game.id}`, { state: { bypassFormGuard: true } });
          },
          error => {
            this.loaderService.stopLoader('app-body');
            this.notifier.notify("error", 'Ошибка в процессе сохранения изображения');
          })
      }, error => {
        this.loaderService.stopLoader('app-body');
        this.notifier.notify("error", 'Ошибка в процессе сохранения игры');
      });
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.getTitle?.value
      || this.getYearOfRelease?.value
      || this.getAnnotation?.value
      || this.getDescription?.value
      || this.getPlayerAge?.value
      || this?.getPlayersMax?.value
      || this.getPlayersMin?.value
      || this.getTimeToPlayMax?.value
      || this.getTimeToPlayMin?.value) {
      return confirm("Вы точно уверены, что хотите покинуть страницу? Все данные будут утеряны!");
    } else {
      return true;
    }
  }

}
