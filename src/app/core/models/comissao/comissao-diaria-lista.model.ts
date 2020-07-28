import { DecimalPipe } from '@angular/common';

export class ComissaoDiariaListaModel {
    id: string;
    nome: string;
    numeroApolice: number;
    valorPago: string;
    valorComissao: string;
    valorComissaoDecimal: number;
    situacao: string;
    ativo: boolean;
    decimalPipe = new DecimalPipe('en-US');
    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        this.numeroApolice = registro.NumeroApolice;
        this.valorPago = this.decimalPipe.transform(registro.ValorPago, '1.2-2').toString().replace('.', ',');
        this.valorComissao = this.decimalPipe.transform(registro.ValorComissao, '1.2-2').toString().replace('.', ',');
        this.valorComissaoDecimal = registro.ValorComissao;
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
