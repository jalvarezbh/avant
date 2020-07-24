import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import {
    startOfDay,
    addHours,
} from 'date-fns';
import { CalendarView, CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { AniversarioDataFormatComponet, colors } from 'src/app/shared/aniversario/aniversariodataformat.component';
import { Subject } from 'rxjs';
import { FluxoService } from 'src/app/core/services/fluxo/fluxo.service';

@Component({
    selector: 'app-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './comissao.component.html',
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: AniversarioDataFormatComponet,
        },
    ],
})
export class ComissaoComponent implements OnInit {
    viewWeek: CalendarView = CalendarView.Week;
    viewDateWeek = new Date();
    eventsWeek: CalendarEvent[] = [];
    refreshWeek: Subject<any> = new Subject();

    constructor(
        private router: Router,
        private loginService: LoginService,
        private fluxoService: FluxoService) { }

    ngOnInit(): void {
        if (this.loginService.getUserLogon()) {
            this.recuperarSemanaPagamento();
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    private recuperarSemanaPagamento() {

        const atual = this.viewDateWeek;
        const first = atual.getDate() - atual.getDay();
        const last = first + 6;

        const firstday = new Date(atual.setDate(first)).toUTCString();
        const lastday = new Date(atual.setDate(last)).toUTCString();

        this.fluxoService.getBuscarFluxoMensalComissaoSemana(firstday, lastday).subscribe(reg => {
            this.eventsWeek = [];
            for (let index = 0; index < reg.length; index++) {
                const element: CalendarEvent = {
                    start: addHours(startOfDay(new Date(reg[index].DataPrevista)), index),
                    end: addHours(startOfDay(new Date(reg[index].DataPrevista)), index + 1),
                    title: reg[index].Nome + ' - ' + reg[index].ValorComissao,
                    color: colors.blue,
                    resizable: {
                        beforeStart: true,
                        afterEnd: true,
                    },
                    draggable: true,
                };
                this.eventsWeek.push(element);
            }
            this.refreshWeek.next();
        });
    }
}
