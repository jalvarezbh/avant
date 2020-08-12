import { DecimalPipe } from '@angular/common';

export class ProdutoListaRelatorioModel {
    produtoId: string;
    produtoDescricao: string;
    produtoCobertura: string;
    produtoAtivo: string;
    id: string;
    faixaEtaria: string;
    comissaoInicial: string;
    comissaoAnual: string;
    comissaoFinal: string;
    capitalSegurado: string;
    premioMinimo: string;
    ativo: string;
    decimalPipe = new DecimalPipe('en-US');
    constructor(registro: any) {
        this.produtoId = registro.Id;
        this.produtoDescricao = registro.ProdutoDescricao;
        this.produtoCobertura = registro.ProdutoCobertura;
        this.produtoAtivo = registro.Ativo ? 'Sim' : 'Não';
        this.id = registro.Id;
        this.faixaEtaria = registro.FaixaEtaria;
        this.comissaoInicial = this.decimalPipe.transform(registro.ComissaoInicial, '1.2-2').toString().replace('.', ',') + '%';
        this.comissaoAnual = this.decimalPipe.transform(registro.ComissaoAnual, '1.2-2').toString().replace('.', ',') + '%';
        this.comissaoFinal = this.decimalPipe.transform(registro.ComissaoFinal, '1.2-2').toString().replace('.', ',') + '%';
        this.capitalSegurado = 'R$ ' + this.decimalPipe.transform(registro.CapitalSegurado, '1.2-2').toString().replace('.', ',');
        this.premioMinimo = 'R$ ' + this.decimalPipe.transform(registro.PremioMinimo, '1.2-2').toString().replace('.', ',');
        this.ativo = registro.Ativo ? 'Sim' : 'Não';
    }
}
