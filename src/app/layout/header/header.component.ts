import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {TokenStorageService} from "../../shared/services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  signOut(): void{
    this.tokenStorageService.signOut()
    this.authService.isLoggedIn = false;
  }

}
