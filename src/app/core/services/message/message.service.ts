import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({ providedIn: 'root' })

export class MessageService {

    constructor(private snackBar: MatSnackBar, private router: Router, private loginService: LoginService) { }

    public exibirSucesso(mensagem: string): void {

        this.snackBar.open(mensagem, 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'success',
        });
    }

    public exibirErro(error: any, texto = ''): void {
        let mensagem = texto;
        if (mensagem === '' || mensagem === undefined) {
            if (error.error !== null) {
                mensagem = error.error.ExceptionMessage !== null && error.error.ExceptionMessage !== undefined ? error.error.ExceptionMessage : error.error;
            }
        }

        if (mensagem === '' || mensagem === undefined) {
            mensagem = error.statusText;
        }

        if (error.status === 401) {
            mensagem = 'Acesso expirado. É necessário fazer o Login na aplicação novamente!';
            this.router.navigateByUrl('login');
            this.loginService.setUserLogout();
        }

        this.snackBar.open(mensagem, 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error',
        });
    }

    public exibirAlerta(mensagem: string): void {

        this.snackBar.open(mensagem, 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'alert',
        });
    }
}
