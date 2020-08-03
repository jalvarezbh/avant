import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpBaseService } from '../../http/http-base.service';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { ComissaoDiariaListaModel, AutoCompleteModel } from '../../models';
import { URLSearchParams } from 'url';

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

    async getBuscarFluxoMensalComissaoSemana(dataInicio: string, dataFinal: string): Promise<any> {
        const userLogin = this.loginService.getUserLogin();
        const parameter = { idusuario: userLogin.id, idempresa: userLogin.idempresa, dataInicio, dataFinal };
        return await this.Get('Fluxo/BuscarFluxoMensalComissaoSemana', parameter).toPromise();
    }

    setConfirmarFluxoMensalLancamentos(registros: ComissaoDiariaListaModel[]): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const ids = registros.map(m => `'${m.id}'`);
        const parameter = { Ids: ids, IdUsuario: userLogin.id, IdEmpresa: userLogin.idempresa };

        return this.Put('Fluxo/ConfirmarFluxoMensalLancamentos', parameter);
    }

    setCancelarFluxoMensalLancamentos(registros: ComissaoDiariaListaModel[]): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const ids = registros.map(m => `'${m.id}'`);
        const parameter = { Ids: ids, IdUsuario: userLogin.id, IdEmpresa: userLogin.idempresa };

        return this.Put('Fluxo/CancelarFluxoMensalLancamentos', parameter);
    }

    getBuscarFluxoMensalInicioMes(mes: number, ano: number): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        const parameter = { idusuario: userLogin.id, idempresa: userLogin.idempresa, mes, ano };
        return this.Get('Fluxo/BuscarFluxoMensalInicioMes', parameter);
    }

    getAutoCompleteSituacao(): AutoCompleteModel[] {
        const retorno: AutoCompleteModel[] = [];
        retorno.push(new AutoCompleteModel({ Descricao: 'Pendente', Id: '0' }));
        retorno.push(new AutoCompleteModel({ Descricao: 'Pago', Id: '1' }));
        retorno.push(new AutoCompleteModel({ Descricao: 'Atrasado', Id: '2' }));
        retorno.push(new AutoCompleteModel({ Descricao: 'Cancelado', Id: '3' }));
        return retorno;
    }

    getBuscarRelatorioFluxoMensal(filtro: any): Observable<any> {
        const userLogin = this.loginService.getUserLogin();
        filtro.idusuario = userLogin.id;
        filtro.idempresa = userLogin.idempresa;
        return this.Get('Fluxo/BuscarRelatorioFluxoMensal', filtro);
    }
}
