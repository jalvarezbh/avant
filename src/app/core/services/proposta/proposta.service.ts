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

    setConfirmarProposta(id: string): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const proposta = { id, idUsuario: userLogin.id, idEmpresa: userLogin.idempresa };
        return this.Put('Proposta/ConfirmarProposta', proposta);
    }

    setCancelarProposta(id: string): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const proposta = { id, idUsuario: userLogin.id, idEmpresa: userLogin.idempresa };
        return this.Put('Proposta/CancelarProposta', proposta);
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

    getBuscarPropostasAniversariantes(mes: number): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const parameter = { idusuario: userLogin.id, idempresa: userLogin.idempresa, mes };
        return this.Get('Proposta/BuscarPropostasAniversariantes', parameter);
    }

    getBuscarPropostasInicioMes(mes: number, ano: number): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const parameter = { idusuario: userLogin.id, idempresa: userLogin.idempresa, mes, ano };
        return this.Get('Proposta/BuscarPropostasInicioMes', parameter);
    }

    getBuscarRelatorioPropostas(filtro: any): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        filtro.idusuario = userLogin.id;
        filtro.idempresa = userLogin.idempresa;
        return this.Get('Proposta/BuscarRelatorioPropostas', filtro);
    }

    getBuscarRelatorioClientes(filtro: any): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        filtro.idusuario = userLogin.id;
        filtro.idempresa = userLogin.idempresa;
        return this.Get('Proposta/BuscarRelatorioClientes', filtro);
    }
}
