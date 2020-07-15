import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpBaseService } from '../../http/http-base.service';
import { LoginModel } from '../../models';

@Injectable({ providedIn: 'root' })
export class LoginService extends HttpBaseService {
    @Output() getLogged: EventEmitter<any> = new EventEmitter();
    userLogin: LoginModel;

    constructor(protected http: HttpClient) {
        super(http);
    }

    setValidarLogin(user: LoginModel) {
        return this.Post('Login/ValidarLogin', user)
            .pipe(map(model => {
                if (model) {
                    this.userLogin = new LoginModel(model);
                    localStorage.setItem('currentUser', JSON.stringify(this.userLogin));
                    this.getLogged.emit(true);
                }
                else {
                    this.getLogged.emit(false);
                }
                return this.userLogin;
            }));
    }

    setUserLogout() {
        localStorage.clear();
        this.getLogged.emit(false);
    }

    getUserLogon(): boolean {
        return localStorage.getItem('currentUser') !== null;
    }

    getUserLogin(): LoginModel {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}
