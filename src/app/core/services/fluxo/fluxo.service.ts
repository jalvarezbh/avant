import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../../http/http-base.service';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FluxoService extends HttpBaseService {
    constructor(protected http: HttpClient, private loginService: LoginService) {
        super(http);
    }

    setIncluirFluxoMensalNovaProposta(registro: any): Observable<any> {
        return this.Post('Fluxo/IncluirFluxoMensalNovaProposta', registro);
    }

    setInativarFluxoMensalCancelarProposta(registro: any): Observable<any> {
        return this.Put('Fluxo/InativarFluxoMensalCancelarProposta', registro);
    }

    getBuscarFluxoMensalComissaoSemana(dataInicio: string, dataFinal: string): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const parameter = { idusuario: userLogin.id, idempresa: userLogin.idempresa, dataInicio, dataFinal };
        return this.Get('Fluxo/BuscarFluxoMensalComissaoSemana', parameter);
    }
}
