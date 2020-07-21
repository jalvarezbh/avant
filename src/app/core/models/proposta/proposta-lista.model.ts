import { DecimalPipe } from '@angular/common';

export class PropostaListaModel {
    id: string;
    nome: string;
    numeroApolice: number;
    valorMensal: string;
    situacao: string;
    ativo: boolean;
    decimalPipe = new DecimalPipe('en-US');
    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        this.numeroApolice = registro.NumeroApolice;
        this.valorMensal = this.decimalPipe.transform(registro.ValorMensal, '1.2-2').toString().replace('.', ',');
        this.situacao = registro.Situacao;
        this.ativo = registro.Ativo;
    }
}
