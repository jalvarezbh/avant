import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  viewDate = new Date();
  dateTitle: string;

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.loginService.getUserLogon()) {
      this.setDateTitle();
    }
    else {
      this.router.navigateByUrl('login');
    }
  }

  setDateTitle() {
    const mes = this.viewDate.getMonth();
    const ano = this.viewDate.getFullYear();
    switch (mes) {
      case 1:
        this.dateTitle = 'Janeiro / ' + ano;
        break;
      case 2:
        this.dateTitle = 'Fevereiro / ' + ano;
        break;
      case 3:
        this.dateTitle = 'Março / ' + ano;
        break;
      case 4:
        this.dateTitle = 'Abril / ' + ano;
        break;
      case 5:
        this.dateTitle = 'Maio / ' + ano;
        break;
      case 6:
        this.dateTitle = 'Junho / ' + ano;
        break;
      case 7:
        this.dateTitle = 'Julho / ' + ano;
        break;
      case 8:
        this.dateTitle = 'Agosto / ' + ano;
        break;
      case 9:
        this.dateTitle = 'Setembro / ' + ano;
        break;
      case 10:
        this.dateTitle = 'Outubro / ' + ano;
        break;
      case 11:
        this.dateTitle = 'Novembro / ' + ano;
        break;
      case 12:
        this.dateTitle = 'Dezembro / ' + ano;
        break;
    }
  }
}
