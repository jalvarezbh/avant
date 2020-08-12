import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../../http/http-base.service';
import { UsuarioModel } from '../../models';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UsuarioService extends HttpBaseService {
    constructor(protected http: HttpClient, private loginService: LoginService) {
        super(http);
    }

    async getBuscarUsuario(): Promise<UsuarioModel> {
        const userLogin = this.loginService.getUserLogin();

        const parameter = { id: userLogin.id, idempresa: userLogin.idempresa };

        return await this.Get('Usuario/BuscarUsuario', parameter).toPromise();
    }

    setAlterarUsuario(registro: AbstractControl): Observable<any> {
        return this.Put('Usuario/AlterarUsuario', registro);
    }

    setAlterarSenhaUsuario(registro: AbstractControl): Observable<any> {
        return this.Put('Usuario/AlterarSenhaUsuario', registro);
    }

    setAlterarSenhaUsuarioToken(registro: AbstractControl): Observable<any> {
        return this.Put('Usuario/AlterarSenhaUsuarioToken', registro);
    }

    setInserirUsuario(registro: AbstractControl): Observable<any> {
        return this.Post('Usuario/InserirUsuario', registro);
    }
}
