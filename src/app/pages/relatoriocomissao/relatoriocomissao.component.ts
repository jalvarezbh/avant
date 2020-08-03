import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ProdutoModel, AutoCompleteModel, ComissaoFiltroRelatorioModel, ComissaoListaRelatorioModel } from 'src/app/core/models';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FluxoService } from 'src/app/core/services/fluxo/fluxo.service';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Observable } from 'rxjs';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { startWith, map } from 'rxjs/operators';
import { DateValidator } from 'src/app/core/validator';

@Component({
    selector: 'app-relatoriocomissao',
    templateUrl: './relatoriocomissao.component.html',
    styleUrls: ['relatoriocomissao.component.css']
})

export class RelatorioComissaoComponent implements OnInit {
    controlProduto = new FormControl();
    filtroProduto: Observable<AutoCompleteModel[]>;
    produtos: ProdutoModel[] = [];
    controlFaixa = new FormControl();
    filtroFaixa: Observable<AutoCompleteModel[]>;
    faixas: AutoCompleteModel[] = [];
    controlSituacao = new FormControl();
    filtroSituacao: Observable<AutoCompleteModel[]>;
    situacoes: AutoCompleteModel[] = [];
    dadosForm: FormGroup;
    submitted = false;
    datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    dataSource: MatTableDataSource<ComissaoListaRelatorioModel>;
    dados: ComissaoListaRelatorioModel[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    columnsToDisplay = [
        'nome',
        'numeroApolice',
        'valorComissao',
        'valorPago',
        'percentual',
        'dataPrevista',
        'dataConfirmacao',
        'situacao',
        'produtoDescricao',
        // 'produtoCobertura',
        'faixaEtaria',
        // 'comissaoInicial',
        // 'comissaoAnual',
        // 'comissaoFinal',
        // 'capitalSegurado',
        // 'premioMinimo',
        'observacao'];


    decimalPipe = new DecimalPipe('en-US');

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private loginService: LoginService,
        private fluxoService: FluxoService,
        private produtoService: ProdutoService) {

        this.dadosForm = this.formBuilder.group({
            nome: ['', ''],
            situacao: ['', ''],
            dataInicial: ['', DateValidator.dateVaidator],
            dataFinal: ['', DateValidator.dateVaidator],
            numeroApolice: ['', ''],
            produto: ['', ''],
            faixa: ['', '']
        });
    }

    ngOnInit() {
        if (this.loginService.getUserLogon()) {
            this.paginator._intl.itemsPerPageLabel = 'Itens por página';
            this.preencherAutoComplete();
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    preencherAutoComplete() {
        this.situacoes = this.fluxoService.getAutoCompleteSituacao();
        this.filtroSituacao = this.controlSituacao.valueChanges.pipe(
            startWith(''),
            map(m => typeof m === 'string' ? m : m.descricao),
            map(m => m ? this.filtroAutoComplete(m, this.situacoes) : this.situacoes.slice())
        );

        this.produtoService.getAutoCompleteProduto().subscribe(reg => {
            this.produtos = reg.map(m => new ProdutoModel(m));
            this.filtroProduto = this.controlProduto.valueChanges.pipe(
                startWith(''),
                map(m => typeof m === 'string' ? m : m.descricao),
                map(m => m ? this.filtroAutoComplete(m, this.produtos) : this.produtos.slice())
            );
        });
    }

    displayFn(registro: AutoCompleteModel): string {
        return registro && registro.descricao ? registro.descricao : '';
    }

    filtroAutoComplete(descricao: string, dados: AutoCompleteModel[]): AutoCompleteModel[] {
        const filterValue = descricao.toLowerCase();
        return dados.filter(filtro => filtro.descricao.toLowerCase().indexOf(filterValue) === 0);
    }

    filtroFaixaProduto(e: any) {
        if (e.id === undefined) {
            return;
        }

        this.produtoService.getAutoCompleteFaixa(e.id).subscribe(reg => {
            this.faixas = reg.map(m => new AutoCompleteModel(m));
            this.filtroFaixa = this.controlFaixa.valueChanges.pipe(
                startWith(''),
                map(m => typeof m === 'string' ? m : m.descricao),
                map(m => m ? this.filtroAutoComplete(m, this.faixas) : this.faixas.slice())
            );
        });
    }

    clickFiltro(control: FormControl) {
        control.setValue({ descricao: '' });
    }

    buscarPesquisaBanco() {
        this.submitted = true;
        if (this.dadosForm.valid) {
            const filtro = new ComissaoFiltroRelatorioModel();
            filtro.nome = this.dadosForm.value.nome;
            filtro.situacao = this.controlSituacao.value ? this.controlSituacao.value.id : '';
            filtro.dataInicial = this.dadosForm.value.dataInicial;
            filtro.dataFinal = this.dadosForm.value.dataFinal;
            filtro.numeroApolice = this.dadosForm.value.numeroApolice;
            filtro.produto = this.controlProduto.value ? this.controlProduto.value.id : '';
            filtro.faixa = this.controlFaixa.value ? this.controlFaixa.value.id : '';

            if (filtro.validarUmObrigatorio()) {
                this.fluxoService.getBuscarRelatorioFluxoMensal(filtro).subscribe(reg => {
                    this.dados = reg.map(m => new ComissaoListaRelatorioModel(m));
                    this.dataSource = new MatTableDataSource(this.dados);
                    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
                    this.dataSource.paginator = this.paginator;
                });
            } else {
                this.messageService.exibirAlerta('Informar pelo menos um campo de filtro no relatório.');
            }
        }
    }

    getTotalComissao() {
        const valor = this.dados.map(t => t.valorComissaoDecimal).reduce((acc, value) => acc + value, 0);
        return 'R$ ' + this.decimalPipe.transform(valor, '1.2-2').toString().replace('.', ',');
    }
}
