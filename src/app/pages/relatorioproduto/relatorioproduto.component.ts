import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ProdutoListaRelatorioModel, ProdutoFiltroRelatorioModel } from 'src/app/core/models';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message/message.service';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';

@Component({
    selector: 'app-relatorioproduto',
    templateUrl: './relatorioproduto.component.html',
    styleUrls: ['relatorioproduto.component.css']
})

export class RelatorioProdutoComponent implements OnInit {
    dadosForm: FormGroup;
    dataSource: MatTableDataSource<ProdutoListaRelatorioModel>;
    dados: ProdutoListaRelatorioModel[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    columnsToDisplay = [
        'produtoDescricao',
        'produtoCobertura',
        'faixaEtaria',
        'comissaoInicial',
        'comissaoAnual',
        'comissaoFinal',
        'capitalSegurado',
        'premioMinimo',
        'produtoAtivo',
        'ativo'];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private loginService: LoginService,
        private produtoService: ProdutoService) {

        this.dadosForm = this.formBuilder.group({
            descricao: ['', ''],
            percentual: ['', ''],
            capitalSegurado: ['', ''],
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
            const filtro = new ProdutoFiltroRelatorioModel();
            filtro.descricao = this.dadosForm.value.descricao;
            filtro.percentual = this.dadosForm.value.percentual;
            filtro.capitalSegurado = this.dadosForm.value.capitalSegurado;
            this.produtoService.getBuscarRelatorioProdutos(filtro).subscribe(reg => {
                if (reg.length !== 0) {
                    this.dados = reg.map(m => new ProdutoListaRelatorioModel(m));
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
