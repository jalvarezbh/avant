import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../../http/http-base.service';
import { LoginService } from '../login/login.service';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProdutoService extends HttpBaseService {
    constructor(protected http: HttpClient, private loginService: LoginService) {
        super(http);
    }

    setIncluirProposta(registro: AbstractControl): Observable<any> {
        return this.Post('Proposta/IncluirProposta', registro);
    }
}
