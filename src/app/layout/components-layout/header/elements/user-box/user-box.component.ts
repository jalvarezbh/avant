import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../../../theme-options';
import { LoginService } from 'src/app/core/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html'
})
export class UserBoxComponent implements OnInit {

  logged = false;
  constructor(public globals: ThemeOptions, private loginService: LoginService, private router: Router) {
    loginService.getLogged.subscribe(login => this.loginUser(login));
  }

  ngOnInit() {
    const userLogon = this.loginService.getUserLogon();
    this.loginUser(userLogon);
  }

  logout(): void {
    this.loginService.setUserLogout();
    this.router.navigateByUrl('login');
  }

  private loginUser(login: boolean): void {
    if (login) {
      this.logged = true;
    }
    else {
      this.logged = false;
    }
  }
}
