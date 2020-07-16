import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { PropostaModel } from 'src/app/core/models';

@Component({
    selector: 'app-confirmacao',
    templateUrl: './confirmacao.component.html',
    styleUrls: ['confirmacao.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class ConfirmacaoComponent implements OnInit {
    dataSource = [];
    columnsToHeader = ['Nome', 'Número Apólice', 'Valor Mensal Pago', 'Dia de Pagamento', 'Ação'];
    columnsToDisplay = ['nome', 'numeroApolice', 'valorMensalLabel', 'diaPagamento', 'id'];

    constructor(
        private router: Router,
        private loginService: LoginService,
        private propostaService: PropostaService) {
    }

    ngOnInit() {
        if (this.loginService.getUserLogon()) {
            this.propostaService.getBuscarPropostasPendente().then(reg => {
                this.dataSource = reg.map(m => new PropostaModel(m, true));
            });
        }
        else {
            this.router.navigateByUrl('login');
        }
    }
}
