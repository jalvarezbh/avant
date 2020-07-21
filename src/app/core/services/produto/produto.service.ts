import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../../http/http-base.service';
import { AutoCompleteModel } from '../../models';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProdutoService extends HttpBaseService {
    constructor(protected http: HttpClient, private loginService: LoginService) {
        super(http);
    }

    getAutoCompleteProduto(): Observable<any> {
        const userLogin = this.loginService.getUserLogin();

        const parameter = { idempresa: userLogin.idempresa };

        return this.Get('Produto/AutoCompleteProdutos', parameter);
    }

    getAutoCompleteFaixa(idproduto: string): Observable<any> {
        const parameter = { idproduto };
        return this.Get('Produto/AutoCompleteFaixas', parameter);
    }

    getAutoCompletePagamento(): AutoCompleteModel[] {
        const retorno: AutoCompleteModel[] = [];
        retorno.push(new AutoCompleteModel({ Descricao: 'Boleto' }));
        retorno.push(new AutoCompleteModel({ Descricao: 'Crédito' }));
        retorno.push(new AutoCompleteModel({ Descricao: 'Débito' }));
        return retorno;
    }

    getAutoCompleteSituacao(): AutoCompleteModel[] {
        const retorno: AutoCompleteModel[] = [];
        retorno.push(new AutoCompleteModel({ Descricao: 'Pendente' }));
        retorno.push(new AutoCompleteModel({ Descricao: 'Confirmado' }));
        retorno.push(new AutoCompleteModel({ Descricao: 'Cancelado' }));
        return retorno;
    }
}
