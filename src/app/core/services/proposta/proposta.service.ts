import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../../http/http-base.service';
import { LoginService } from '../login/login.service';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PropostaModel } from '../../models';

@Injectable({ providedIn: 'root' })
export class PropostaService extends HttpBaseService {
    constructor(protected http: HttpClient, private loginService: LoginService) {
        super(http);
    }

    setIncluirProposta(registro: AbstractControl): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const proposta = new PropostaModel(registro, false);
        proposta.idUsuario = userLogin.id;
        proposta.idEmpresa = userLogin.idempresa;

        return this.Post('Proposta/IncluirProposta', proposta);
    }

    setAlterarProposta(registro: AbstractControl): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const proposta = new PropostaModel(registro, false);
        proposta.idUsuario = userLogin.id;
        proposta.idEmpresa = userLogin.idempresa;
        return this.Put('Proposta/AlterarProposta', proposta);
    }

    async getBuscarPropostasPendente(): Promise<any> {
        const userLogin = this.loginService.getUserLogin();
        const parameter = { idusuario: userLogin.id, idempresa: userLogin.idempresa };
        return await this.Get('Proposta/BuscarPropostasPendente', parameter).toPromise();
    }

    async getBuscarPropostas(): Promise<any> {
        const userLogin = this.loginService.getUserLogin();
        const parameter = { idusuario: userLogin.id, idempresa: userLogin.idempresa };
        return await this.Get('Proposta/BuscarPropostas', parameter).toPromise();
    }

    async getBuscarProposta(id: string): Promise<any> {
        const userLogin = this.loginService.getUserLogin();
        const parameter = { id, idusuario: userLogin.id, idempresa: userLogin.idempresa };
        return await this.Get('Proposta/BuscarProposta', parameter).toPromise();
    }
}
