import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { MessageService } from '../services/message/message.service';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService, private messageService: MessageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.startLoading();
        return from(next.handle(request).pipe(
            catchError(error => {
                this.messageService.exibirErro(error);
                return throwError(error);
            }),
            finalize(() => { this.loadingService.endLoading(); })
        ));
    }
}
