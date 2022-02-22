import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {AuthService} from "../../shared/services/auth.service";
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {Router} from "@angular/router";
import {NotifierService} from "angular-notifier";
import {UserService} from "../../shared/services/user.service";
import {ComponentCanDeactivate} from "../../shared/guards/save-data.guard";
import {Observable} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, ComponentCanDeactivate {

  registrationForm!: FormGroup;
  username!: string;
  password!: string;
  mail!: string;
  town!: string;
  avatar: any;

  constructor(private loaderService: NgxUiLoaderService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private notifier: NotifierService,
              private userService: UserService) {
  }

  get getUsername() {
    return this.registrationForm.get('username');
  }

  get getPassword() {
    return this.registrationForm.get('password');
  }

  get getMail() {
    return this.registrationForm.get('mail');
  }

  get getTown() {
    return this.registrationForm.get('town');
  }

  get getAvatar() {
    return this.registrationForm.get('avatar');
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl(this.username, [Validators.required]),
      password: new FormControl(this.password, [Validators.required]),
      mail: new FormControl(this.mail, [Validators.required]),
      town: new FormControl(this.town),
      avatar: new FormControl(this.avatar)
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.username = this.getUsername?.value;
      this.password = this.getPassword?.value;
      this.mail = this.getMail?.value;
      this.town = this.getTown?.value;
      const imageData = new FormData();
      imageData.append('avatar', this.getAvatar?.value.files[0]);
      this.avatar = imageData;
      this.signUp();
    } else {
      this.registrationForm.reset();
    }
  }

  signUp(): void {
    //wrap in transaction two post query or make another gui - for example two windows, one for personal data, one for avatar

    this.authService.signUp(this.username, this.password, this.mail, this.town).subscribe(
      res => {
        this.userService.uploadAvatar(this.avatar, this.username).subscribe(res => {
            this.loaderService.stopLoader('app-body');
            this.notifier.notify("success", 'Регистрация прошла успешно');
            this.router.navigateByUrl("/authentication");
          },
          error => {
            this.loaderService.stopLoader('app-body');
            this.notifier.notify("error", 'Ошибка в процессе загрузки аватара')
          });
      },
      error => {
        this.loaderService.stopLoader('app-body');
        this.notifier.notify("error", 'Ошибка в процессе регистрации')
      });
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.getUsername?.value || this.getPassword?.value || this.getMail?.value || this.getTown?.value) {
      return confirm("Вы точно уверены, что хотите покинуть страницу? Все данные будут утеряны!")
    } else {
      return true;
    }
  }
}
