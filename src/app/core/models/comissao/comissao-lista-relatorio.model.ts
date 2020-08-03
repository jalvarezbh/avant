import { DecimalPipe, DatePipe } from '@angular/common';

export class ComissaoListaRelatorioModel {
        id: string;
        nome: string;
        numeroApolice: number;
        valorPago: string;
        dataPrevista: string;
        dataConfirmacao: string;
        situacao: string;
        ativo: boolean;
        observacao: string;
        percentual: string;
        valorComissao: string;
        valorComissaoDecimal: number;
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
                this.numeroApolice = registro.NumeroApolice;
                this.valorPago = this.decimalPipe.transform(registro.ValorPago, '1.2-2').toString().replace('.', ',');
                this.dataPrevista = this.datepipe.transform(new Date(registro.DataPrevista), 'dd/MM/yyyy');
                this.dataConfirmacao = registro.DataConfirmacao === null ? ' - ' : this.datepipe.transform(new Date(registro.DataConfirmacao), 'dd/MM/yyyy');
                this.observacao = registro.Observacao;
                this.percentual = this.decimalPipe.transform(registro.Percentual, '1.2-2').toString().replace('.', ',') + '%';
                this.valorComissao = this.decimalPipe.transform(registro.ValorComissao, '1.2-2').toString().replace('.', ',');
                this.valorComissaoDecimal = registro.ValorComissao;
                this.produtoDescricao = registro.ProdutoDescricao;
                this.produtoCobertura = registro.ProdutoCobertura;
                this.faixaEtaria = registro.FaixaEtaria;
                this.comissaoInicial = this.decimalPipe.transform(registro.ComissaoInicial, '1.2-2').toString().replace('.', ',') + '%';
                this.comissaoAnual = this.decimalPipe.transform(registro.ComissaoAnual, '1.2-2').toString().replace('.', ',') + '%';
                this.comissaoFinal = this.decimalPipe.transform(registro.ComissaoFinal, '1.2-2').toString().replace('.', ',') + '%';
                this.capitalSegurado = 'R$ ' + this.decimalPipe.transform(registro.CapitalSegurado, '1.2-2').toString().replace('.', ',');
                this.premioMinimo = 'R$ ' + this.decimalPipe.transform(registro.PremioMinimo, '1.2-2').toString().replace('.', ',');
                this.ativo = registro.Ativo;

                switch (registro.Situacao) {
                        case 0: this.situacao = 'Pendente';
                                break;
                        case 1: this.situacao = 'Pago';
                                break;
                        case 2: this.situacao = 'Atrasado';
                                break;
                        case 3: this.situacao = 'Cancelado';
                                break;
                }
        }
}
