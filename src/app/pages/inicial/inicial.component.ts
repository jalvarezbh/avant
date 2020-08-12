import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
    selector: 'app-inicial',
    templateUrl: './inicial.component.html',
    styleUrls: ['./inicial.component.css']
})

export class InicialComponent implements OnInit {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    ngOnInit(): void {
        this.loginService.setUserLogout();
    }

    clickLogin() {
        this.router.navigateByUrl('login');
    }

    clickCadastro() {
        this.router.navigateByUrl('cadastro');
    }
}
