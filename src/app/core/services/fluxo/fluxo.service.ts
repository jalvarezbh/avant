import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../../http/http-base.service';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { PropostaModel } from '../../models';

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
}
