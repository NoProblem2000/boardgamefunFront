import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {AuthService} from "../../shared/services/auth.service";
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {Router} from "@angular/router";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username!: string;
  password!: string;
  loginForm!: FormGroup;

  constructor(private loaderService: NgxUiLoaderService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private notifier: NotifierService) {
  }

  get getUsername() {
    return this.loginForm.get('username');
  }

  get getPassword() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, [Validators.required]),
      password: new FormControl(this.password, [Validators.required])
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.username = this.getUsername?.value;
      this.password = this.getPassword?.value;
      this.signIn();
    } else {
      this.loginForm.reset();
    }
  }

  signIn(): void {
    this.loaderService.startLoader('authentication-page');
    this.authService.signIn(this.username, this.password).subscribe(
      data => {
        this.loaderService.stopLoader('authentication-page');
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.authService.isLoggedIn = true;
        this.authService.enter.next();
        this.notifier.notify("success", 'Авторизация прошла успешно');
        this.router.navigateByUrl("");
      },
      err => {
        this.loaderService.stopLoader('authentication-page');
        this.notifier.notify("error", 'Ошибка в процессе авторизации')
      }
    );
  }

}
