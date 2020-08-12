import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ProdutoService } from 'src/app/core/services/produto/produto.service';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { ProdutoModel, AutoCompleteModel, PropostaModel } from 'src/app/core/models';
import { getPhoneMask } from 'src/app/shared/util/util';
import { DateValidator } from 'src/app/core/validator';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { FluxoService } from 'src/app/core/services/fluxo/fluxo.service';

@Component({
    selector: 'app-propostaalterar',
    templateUrl: './propostaalterar.component.html'
})

export class PropostaAlterarComponent implements OnInit {
    proposta: PropostaModel;
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
        private activedRoute: ActivatedRoute,
        private messageService: MessageService,
        private loginService: LoginService,
        private produtoService: ProdutoService,
        private propostaService: PropostaService,
        private fluxoService: FluxoService) {
        this.preencherForm(false);
    }

    ngOnInit() {
        const id = this.activedRoute.snapshot.queryParams.id;
        this.celularCode = '+55';
        this.celularmask = this.inicialCelMask;

        if (this.loginService.getUserLogon()) {
            this.propostaService.getBuscarProposta(id).then(reg => {
                this.proposta = new PropostaModel(reg, true);
                this.inicializarTela();
            });
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    async inicializarTela() {
        await this.preencherAutoComplete();
        this.preencherForm(true);
    }

    preencherAutoComplete(): Promise<any> {
        return new Promise(resolve => {
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

                if (this.proposta.idProduto) {
                    this.produtoService.getAutoCompleteFaixa(this.proposta.idProduto).subscribe(val => {
                        this.faixas = val.map(m => new AutoCompleteModel(m));
                        this.filtroFaixa = this.controlFaixa.valueChanges.pipe(
                            startWith(''),
                            map(m => typeof m === 'string' ? m : m.descricao),
                            map(m => m ? this.filtroAutoComplete(m, this.faixas) : this.faixas.slice())
                        );
                        resolve();
                    });
                }
                else { resolve(); }
            });
        });
    }

    preencherForm(dados: boolean) {
        if (dados) {
            const dataNascimentoTexto = this.datepipe.transform(this.proposta.dataNascimento, 'dd/MM/yyyy');
            const dataInicioTexto = this.datepipe.transform(this.proposta.dataInicio, 'dd/MM/yyyy');
            const intlphone = (window as any).intlTelInputGlobals.getInstance(document.getElementById('celular'));
            intlphone.setNumber('+' + this.proposta.celular);
            const celular = this.proposta.celular.substring(intlphone.s.dialCode.length);
            const produto = this.produtos.filter(f => f.id === this.proposta.idProduto);
            this.controlProduto.setValue(produto[0]);
            const faixa = this.faixas.filter(f => f.id === this.proposta.idProdutoValores);
            this.controlFaixa.setValue(faixa[0]);
            this.controlPagamento.setValue({ descricao: this.proposta.formaPagamento });
            this.controlSituacao.setValue({ descricao: this.proposta.situacao });
            this.dadosForm = this.formBuilder.group({
                id: [this.proposta.id, ''],
                nome: [this.proposta.nome, Validators.required],
                genero: [this.proposta.genero, ''],
                possuifilhos: [this.proposta.possuiFilho.toString(), Validators.required],
                email: [this.proposta.email, Validators.compose([
                    Validators.required,
                    Validators.email
                ])],
                dataNascimento: [dataNascimentoTexto, Validators.compose([
                    Validators.required,
                    DateValidator.dateVaidator
                ])],
                celular: [celular, Validators.required],
                numeroApolice: [this.proposta.numeroApolice, Validators.required],
                produto: this.controlProduto,
                faixa: this.controlFaixa,
                valorMensalPago: [this.proposta.valorMensal, Validators.required],
                pagamento: this.controlPagamento,
                diaPagamento: [this.proposta.diaPagamento, Validators.required],
                dataInicio: [dataInicioTexto, ''],
                situacao: this.controlSituacao,
                ativo: [this.proposta.ativo.toString(), ''],
                observacao: [this.proposta.observacao, '']
            });

        } else {
            const dataAtual = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
            this.dadosForm = this.formBuilder.group({
                id: ['', ''],
                nome: ['', Validators.required],
                genero: ['', ''],
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
                ativo: ['true', ''],
                observacao: ['', '']
            });
        }
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

    private autoCompleteForm() {
        // const produto = this.controlProduto.value ? this.controlProduto.value.id : '';
        // const faixa = this.controlFaixa.value ? this.controlFaixa.value.id : '';
        // const pagamento = this.controlPagamento.value ? this.controlPagamento.value.descricao : '';
        // const situacao = this.controlSituacao.value ? this.controlSituacao.value.descricao : '';

        // this.dadosForm.get('produto').setValue(produto);
        // this.dadosForm.get('faixa').setValue(faixa);
        // this.dadosForm.get('pagamento').setValue(pagamento);
        // this.dadosForm.get('situacao').setValue(situacao);

        this.celularNumber = this.dadosForm.value.celular;
        this.dadosForm.controls.celular.setValue(this.celularCode + this.dadosForm.value.celular);
    }

    private autoCompleteReturn() {
        // if (this.controlProduto.value) {
        //     this.controlProduto.setValue(this.controlProduto.value);
        // }

        // if (this.controlFaixa.value) {
        //     this.controlFaixa.setValue(this.controlFaixa.value);
        // }

        // if (this.controlPagamento.value) {
        //     this.controlPagamento.setValue(this.controlPagamento.value);
        // }

        // if (this.controlSituacao.value) {
        //     this.controlSituacao.setValue(this.controlSituacao.value);
        // }

        this.dadosForm.controls.celular.setValue(this.celularNumber);
    }

    public async clickGravar() {
        this.submitted = true;
        this.autoCompleteForm();
        if (this.dadosForm.valid) {
            await this.propostaService.setAlterarProposta(this.dadosForm.value).toPromise().then(reg => {
                if (this.proposta.situacao !== reg.Situacao && reg.Situacao === 'Confirmado' && reg.Ativo === true) {
                    this.messageService.exibirSucesso('Proposta confirmada com sucesso! Aguarde a criação do fluxo mensal.');
                    this.fluxoService.setIncluirFluxoMensalNovaProposta(reg).subscribe(() => {
                        this.messageService.exibirSucesso('Fluxo mensal incluído com sucesso!');
                        this.proposta = new PropostaModel(reg, true);
                        this.preencherForm(true);
                    });
                }
                else {
                    if ((this.proposta.situacao !== reg.Situacao && reg.Situacao === 'Cancelado') ||
                        (this.proposta.ativo !== reg.Ativo && reg.Ativo === false)) {
                        this.messageService.exibirSucesso('Proposta cancelada com sucesso! Aguarde cancelando fluxo mensal.');
                        this.fluxoService.setInativarFluxoMensalCancelarProposta(reg).subscribe(() => {
                            this.messageService.exibirSucesso('Fluxo mensal cancelado com sucesso!');
                            this.proposta = new PropostaModel(reg, true);
                            this.preencherForm(true);
                        });
                    }
                    else {
                        this.messageService.exibirSucesso('Proposta alterada com sucesso!');
                        this.proposta = new PropostaModel(reg, true);
                        this.preencherForm(true);
                    }
                }
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
