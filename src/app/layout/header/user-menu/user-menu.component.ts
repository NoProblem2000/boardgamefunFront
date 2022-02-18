import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../../shared/services/user.service";
import {blobToImage} from "../../../shared/functions/shared-func";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  animations: [
    trigger('animateMenu', [
      state('open', style({
        height: '*'
      })),
      state('close', style({
        height: '0px'
      })),
      transition('open <=> close', [
        animate('0.3s ease-out')
      ])
    ]),
  ]
})
export class UserMenuComponent implements OnInit {

  name: string;
  avatar: any;
  isUserMenuOpen = false;

  constructor(public authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private userService: UserService) {
    this.name = tokenStorage.getUser().userName;
    if (tokenStorage.getUser()?.id)
      this.userService.getUser(tokenStorage.getUser().id).subscribe(res => {
        this.avatar = res.user.avatar;
      })
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
    }
  }

  signOut(): void {
    this.toggleUserMenu();
    this.tokenStorage.signOut()
    this.authService.isLoggedIn = false;
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  convertImage(blob: any): string {
    return blobToImage(blob)
  }

}
