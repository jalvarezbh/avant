import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { PropostaPendenteModel } from 'src/app/core/models';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MessageService } from 'src/app/core/services/message/message.service';
import { FluxoService } from 'src/app/core/services/fluxo/fluxo.service';

@Component({
    selector: 'app-propostapendente',
    templateUrl: './propostapendente.component.html',
    styleUrls: ['propostapendente.component.css']
})

export class PropostaPendenteComponent implements OnInit {
    dataSource: MatTableDataSource<PropostaPendenteModel>;
    @ViewChild(MatSort) sort: MatSort;
    columnsToDisplay = ['nome', 'numeroApolice', 'valorMensal', 'diaPagamento', 'id'];

    constructor(
        private router: Router,
        private messageService: MessageService,
        private loginService: LoginService,
        private propostaService: PropostaService,
        private fluxoService: FluxoService) {
    }

    ngOnInit() {
        if (this.loginService.getUserLogon()) {
            this.atualizar();
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    atualizar() {
        this.propostaService.getBuscarPropostasPendente().then(reg => {
            this.dataSource = new MatTableDataSource(reg.map(m => new PropostaPendenteModel(m)));
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = function customFilter(data, filter: string): boolean {
                return (data.nome.indexOf(filter) !== -1 ||
                    data.numeroApolice.toString().indexOf(filter) !== -1 ||
                    data.valorMensal.toString().indexOf(filter) !== -1 ||
                    data.diaPagamento.toString().indexOf(filter) !== -1);
            };
        });
    }

    pesquisar(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    async confirmarProposta(id: string) {
        await this.propostaService.setConfirmarProposta(id).toPromise().then(reg => {
            if (reg.Situacao === 'Confirmado') {
                this.messageService.exibirSucesso('Proposta confirmada com sucesso! Aguarde a criação do fluxo mensal.');
                this.fluxoService.setIncluirFluxoMensalNovaProposta(reg).subscribe(() => {
                    this.messageService.exibirSucesso('Fluxo mensal incluído com sucesso!');
                    this.atualizar();
                });
            }
        });
    }

    async cancelarProposta(id: string) {
        await this.propostaService.setCancelarProposta(id).toPromise().then(reg => {
            if (reg.Situacao === 'Cancelado') {
                this.messageService.exibirSucesso('Proposta cancelada com sucesso! Aguarde cancelando fluxo mensal.');
                this.fluxoService.setInativarFluxoMensalCancelarProposta(reg).subscribe(() => {
                    this.messageService.exibirSucesso('Fluxo mensal cancelado com sucesso!');
                    this.atualizar();
                });
            }
        });
    }
}
