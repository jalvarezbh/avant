import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import {
  startOfDay,
  addHours,
} from 'date-fns';
import { CalendarView, CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { AniversarioDataFormatComponet, colors } from 'src/app/shared/aniversario/aniversariodataformat.component';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { Subject } from 'rxjs';
import { FluxoService } from 'src/app/core/services/fluxo/fluxo.service';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: AniversarioDataFormatComponet,
    },
  ],
})
export class HomeComponent implements OnInit {

  view: CalendarView = CalendarView.Day;
  viewDate = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  totalAniversario = 0;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private propostaService: PropostaService,
    private fluxoService: FluxoService) { }

  ngOnInit(): void {
    if (this.loginService.getUserLogon()) {
      this.recuperarAniversariosMes();
    }
    else {
      this.router.navigateByUrl('login');
    }
  }

  private recuperarAniversariosMes() {
    const mes = new Date().getMonth() + 1;
    const daysN = [];
    this.propostaService.getBuscarPropostasAniversariantes(mes).subscribe(reg => {
      this.events = [];
      for (let index = 0; index < reg.length; index++) {
        let celular = (reg[index].Celular as string);
        if (celular.startsWith('55')) {
          celular = '(' + celular.substring(2, 4) + ')' + celular.substring(4);
        }

        const element: CalendarEvent = {
          start: addHours(startOfDay(new Date()), index),
          end: addHours(startOfDay(new Date()), index + 1),
          title: reg[index].Nome + ' - ' + celular,
          color: colors.blue,
          cssClass: 'readOnly',
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        };
        this.events.push(element);
        const diaN = new Date(reg[index].DataNascimento);
        daysN.push(diaN.getDate());
      }
      this.totalAniversario = reg.length - 1;
      localStorage.setItem('daysNiver', JSON.stringify(daysN));
      this.refresh.next();
    });
  }
}
