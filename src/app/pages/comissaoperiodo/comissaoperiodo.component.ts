import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ComissaoDiariaListaModel } from 'src/app/core/models';
import { MatTableDataSource, MatSort, MatDatepickerInputEvent, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { FluxoService } from 'src/app/core/services/fluxo/fluxo.service';
import { addDays } from 'date-fns';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'src/app/core/services/message/message.service';

@Component({
    selector: 'app-comissaoperiodo',
    templateUrl: './comissaoperiodo.component.html',
    styleUrls: ['comissaoperiodo.component.css'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-in' },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
})

export class ComissaoPeriodoComponent implements OnInit {
    dataSource: MatTableDataSource<ComissaoDiariaListaModel>;
    dados: ComissaoDiariaListaModel[] = [];
    @ViewChild(MatSort) sort: MatSort;
    columnsToDisplay = ['nome', 'numeroApolice', 'valorComissao', 'situacao', 'id'];
    datepipe = new DatePipe('en-US');
    decimalPipe = new DecimalPipe('en-US');
    dataInicio = new Date();
    dataInicioTexto: string;
    dataFinal = new Date();
    dataFinalTexto: string;
    dataInicioReferencia: FormControl;
    dataFinalReferencia: FormControl;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private loginService: LoginService,
        private fluxoService: FluxoService) {
    }

    ngOnInit() {
        if (this.loginService.getUserLogon()) {
            this.loginService.getUserTempoAcesso().then(reg => {
                if (!reg) {
                    this.router.navigateByUrl('login');
                }

                const first = this.dataInicio.getDate() - this.dataInicio.getDay();
                const last = first + 6;
                const dataLast = new Date();
                this.dataFinal = new Date(dataLast.setDate(last));
                this.dataInicio = new Date(this.dataInicio.setDate(first));

                this.dataInicioReferencia = new FormControl({ value: moment([this.dataInicio.getFullYear(), this.dataInicio.getMonth(), this.dataInicio.getDate()]), disabled: true });
                this.dataFinalReferencia = new FormControl({ value: moment([this.dataFinal.getFullYear(), this.dataFinal.getMonth(), this.dataFinal.getDate()]), disabled: true });
                this.buscarPesquisaBanco();
            });
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    buscarPesquisaBanco() {
        this.dataInicioTexto = this.datepipe.transform(this.dataInicio, 'dd/MM/yyyy');
        this.dataFinalTexto = this.datepipe.transform(this.dataFinal, 'dd/MM/yyyy');
        const dataInicio = this.datepipe.transform(this.dataInicio, 'yyyy-MM-dd');
        const dataFinal = this.datepipe.transform(addDays(this.dataFinal, 1), 'yyyy-MM-dd');

        this.fluxoService.getBuscarFluxoMensalComissaoSemana(dataInicio, dataFinal).then(reg => {
            this.dados = reg.map(m => new ComissaoDiariaListaModel(m));
            this.dataSource = new MatTableDataSource(this.dados);
            this.dataSource.sort = this.sort;
        });
    }

    changeDataInicio(event: MatDatepickerInputEvent<Date>) {
        this.dataInicio = new Date(event.value);
        this.buscarPesquisaBanco();
    }

    changeDataFinal(event: MatDatepickerInputEvent<Date>) {
        this.dataFinal = new Date(event.value);
        this.buscarPesquisaBanco();
    }

    getTotalComissao() {
        const valor = this.dados.map(t => t.valorComissaoDecimal).reduce((acc, value) => acc + value, 0);
        return 'R$ ' + this.decimalPipe.transform(valor, '1.2-2').toString().replace('.', ',');
    }

    async confirmarTodosPagamentos() {
        await this.fluxoService.setConfirmarFluxoMensalLancamentos(this.dados).toPromise().then(reg => {
            this.messageService.exibirSucesso('Comissões confirmadas com sucesso!');
            this.buscarPesquisaBanco();
        });
    }

    async confirmarPagamento(id: string) {
        const comissaoLinha = [];
        comissaoLinha.push({ id });
        await this.fluxoService.setConfirmarFluxoMensalLancamentos(comissaoLinha).toPromise().then(reg => {
            this.messageService.exibirSucesso('Comissão confirmada com sucesso!');
            this.buscarPesquisaBanco();
        });
    }

    async cancelarPagamento(id: string) {
        const comissaoLinha = [];
        comissaoLinha.push({ id });
        await this.fluxoService.setCancelarFluxoMensalLancamentos(comissaoLinha).toPromise().then(reg => {
            this.messageService.exibirSucesso('Comissão cancelada com sucesso!');
            this.buscarPesquisaBanco();
        });
    }
}
