import { DecimalPipe, DatePipe } from '@angular/common';

export class PropostaListaRelatorioModel {
    id: string;
    nome: string;
    celular: string;
    email: string;
    dataNascimento: string;
    possuiFilhos: string;
    numeroApolice: number;
    valorMensal: string;
    formaPagamento: string;
    diaPagamento: string;
    dataInicio: string;
    situacao: string;
    ativo: string;
    observacao: string;
    produtoDescricao: string;
    produtoCobertura: string;
    faixaEtaria: string;
    comissaoInicial: string;
    comissaoAnual: string;
    comissaoFinal: string;
    capitalSegurado: string;
    premioMinimo: string;
    datepipe = new DatePipe('en-US');
    decimalPipe = new DecimalPipe('en-US');
    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        const regCelular = (registro.Celular as string);
        if (regCelular.startsWith('55')) {
            this.celular = '(' + regCelular.substring(2, 4) + ')' + regCelular.substring(4);
        } else {
            this.celular = regCelular;
        }
        this.email = registro.Email;
        this.dataNascimento = this.datepipe.transform(new Date(registro.DataNascimento), 'dd/MM/yyyy');
        this.possuiFilhos = registro.PossuiFilho ? 'Sim' : 'Não';
        this.numeroApolice = registro.NumeroApolice;
        this.valorMensal = this.decimalPipe.transform(registro.ValorMensal, '1.2-2').toString().replace('.', ',');
        this.formaPagamento = registro.FormaPagamento;
        this.diaPagamento = registro.DiaPagamento;
        this.dataInicio = this.datepipe.transform(new Date(registro.DataInicio), 'dd/MM/yyyy');
        this.situacao = registro.Situacao;
        this.ativo = registro.Ativo ? 'Sim' : 'Não';
        this.observacao = registro.Observacao;
        this.produtoDescricao = registro.ProdutoDescricao;
        this.produtoCobertura = registro.ProdutoCobertura;
        this.faixaEtaria = registro.FaixaEtaria;
        this.comissaoInicial = this.decimalPipe.transform(registro.ComissaoInicial, '1.2-2').toString().replace('.', ',') + '%';
        this.comissaoAnual = this.decimalPipe.transform(registro.ComissaoAnual, '1.2-2').toString().replace('.', ',') + '%';
        this.comissaoFinal = this.decimalPipe.transform(registro.ComissaoFinal, '1.2-2').toString().replace('.', ',') + '%';
        this.capitalSegurado = 'R$ ' + this.decimalPipe.transform(registro.CapitalSegurado, '1.2-2').toString().replace('.', ',');
        this.premioMinimo = 'R$ ' + this.decimalPipe.transform(registro.PremioMinimo, '1.2-2').toString().replace('.', ',');
    }
}
