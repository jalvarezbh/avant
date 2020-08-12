import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ClienteListaRelatorioModel, ClienteFiltroRelatorioModel } from 'src/app/core/models';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message/message.service';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';

@Component({
    selector: 'app-relatoriocliente',
    templateUrl: './relatoriocliente.component.html',
    styleUrls: ['relatoriocliente.component.css']
})

export class RelatorioClienteComponent implements OnInit {
    dadosForm: FormGroup;
    dataSource: MatTableDataSource<ClienteListaRelatorioModel>;
    dados: ClienteListaRelatorioModel[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    columnsToDisplay = [
        'nome',
        'celular',
        'email',
        'dataNascimento',
        'genero',
        'possuiFilhos'];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private loginService: LoginService,
        private propostaService: PropostaService) {

        this.dadosForm = this.formBuilder.group({
            nome: ['', ''],
            genero: ['', ''],
            possuiFilhos: ['', ''],
            mesInicial: ['', ''],
            mesFinal: ['', ''],
        });
    }

    ngOnInit() {
        if (this.loginService.getUserLogon()) {
            this.paginator._intl.itemsPerPageLabel = 'Itens por página';
            this.buscarPesquisaBanco();
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    buscarPesquisaBanco() {
        if (this.dadosForm.valid) {
            const filtro = new ClienteFiltroRelatorioModel();
            filtro.nome = this.dadosForm.value.nome;
            filtro.genero = this.dadosForm.value.genero;
            filtro.possuiFilhos = this.dadosForm.value.possuiFilhos;
            filtro.mesInicial = this.dadosForm.value.mesInicial ? this.dadosForm.value.mesInicial : '';
            filtro.mesFinal = this.dadosForm.value.mesFinal ? this.dadosForm.value.mesFinal : '';
            this.propostaService.getBuscarRelatorioClientes(filtro).subscribe(reg => {
                if (reg.length !== 0) {
                    this.dados = reg.map(m => new ClienteListaRelatorioModel(m));
                    this.dataSource = new MatTableDataSource(this.dados);
                    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
                    this.dataSource.paginator = this.paginator;
                }
                else {
                    this.messageService.exibirAlerta('A pesquisa não retornou registro.');
                }
            });
        }
    }
}
