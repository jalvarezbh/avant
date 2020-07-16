import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { ProdutoModel, AutoCompleteModel } from 'src/app/core/models';
import { getPhoneMask } from 'src/app/shared/util/util';
import { DateValidator } from 'src/app/core/validator';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-proposta',
    templateUrl: './proposta.component.html'
})

export class PropostaComponent implements OnInit {
    controlProduto = new FormControl();
    filtroProduto: Observable<AutoCompleteModel[]>;
    produtos: ProdutoModel[] = [];
    controlFaixa = new FormControl();
    filtroFaixa: Observable<AutoCompleteModel[]>;
    faixas: AutoCompleteModel[] = [];
    controlPagamento = new FormControl();
    filtroPagamento: Observable<AutoCompleteModel[]>;
    pagamentos: AutoCompleteModel[] = [];
    controlSituacao = new FormControl();
    filtroSituacao: Observable<AutoCompleteModel[]>;
    situacoes: AutoCompleteModel[] = [];
    dadosForm: FormGroup;
    submitted = false;
    celularCode: string;
    celularNumber: string;
    celularmask: any[];
    inicialCelMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    datepipe = new DatePipe('en-US');
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private loginService: LoginService,
        private produtoService: ProdutoService,
        private propostaService: PropostaService) {
    }

    ngOnInit() {
        this.celularCode = '+55';
        this.celularmask = this.inicialCelMask;

        if (this.loginService.getUserLogon()) {
            this.preencherAutoComplete();
            this.preencherForm();
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    preencherAutoComplete() {
        this.pagamentos = this.produtoService.getAutoCompletePagamento();
        this.filtroPagamento = this.controlPagamento.valueChanges.pipe(
            startWith(''),
            map(m => typeof m === 'string' ? m : m.descricao),
            map(m => m ? this.filtroAutoComplete(m, this.pagamentos) : this.pagamentos.slice())
        );

        this.situacoes = this.produtoService.getAutoCompleteSituacao();
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

    preencherForm() {
        const dataAtual = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
        this.dadosForm = this.formBuilder.group({
            id: ['', ''],
            nome: ['', Validators.required],
            possuifilhos: ['false', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            dataNascimento: ['', Validators.compose([
                Validators.required,
                DateValidator.dateVaidator
            ])],
            celular: ['', Validators.required],
            numeroApolice: ['', Validators.required],
            produto: ['', Validators.required],
            faixa: ['', Validators.required],
            valorMensalPago: ['', Validators.required],
            pagamento: ['', Validators.required],
            diaPagamento: ['', Validators.required],
            dataInicio: [dataAtual, ''],
            situacao: ['', Validators.required],
            ativo: [true, '']
        });

        this.controlSituacao.setValue({ descricao: 'Pendente' });
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

    private autoCompleteForm() {
        const produto = this.controlProduto.value ? this.controlProduto.value.id : '';
        const faixa = this.controlFaixa.value ? this.controlFaixa.value.id : '';
        const pagamento = this.controlPagamento.value ? this.controlPagamento.value.descricao : '';
        const situacao = this.controlSituacao.value ? this.controlSituacao.value.descricao : '';

        this.dadosForm.get('produto').setValue(produto);
        this.dadosForm.get('faixa').setValue(faixa);
        this.dadosForm.get('pagamento').setValue(pagamento);
        this.dadosForm.get('situacao').setValue(situacao);

        this.celularNumber = this.dadosForm.value.celular;
        this.dadosForm.controls.celular.setValue(this.celularCode + this.dadosForm.value.celular);
    }

    private autoCompleteReturn() {
        if (this.controlProduto.value) {
            this.controlProduto.setValue(this.controlProduto.value);
        }

        if (this.controlFaixa.value) {
            this.controlFaixa.setValue(this.controlFaixa.value);
        }

        if (this.controlPagamento.value) {
            this.controlPagamento.setValue(this.controlPagamento.value);
        }

        if (this.controlSituacao.value) {
            this.controlSituacao.setValue(this.controlSituacao.value);
        }

        this.dadosForm.controls.celular.setValue(this.celularNumber);
    }

    public async clickGravar() {
        this.submitted = true;
        this.autoCompleteForm();
        if (this.dadosForm.valid) {
            await this.propostaService.setIncluirProposta(this.dadosForm.value).toPromise().then(reg => {
                this.messageService.exibirSucesso('Proposta incluída com sucesso!');
                window.location.reload();
                // this.submitted = false;
                // this.preencherAutoComplete();
                // this.preencherForm();
            }).catch(() => this.autoCompleteReturn());
        } else {
            this.autoCompleteReturn();
        }
    }

    onCountryChangeCel(e: any, id: string) {
        this.celularmask = getPhoneMask(e, false, id);
        this.celularCode = e.dialCode;
    }
}
