import { DecimalPipe } from '@angular/common';
export class PropostaPendenteModel {
    id: string;
    nome: string;
    numeroApolice: number;
    valorMensal: string;
    diaPagamento: number;
    decimalPipe = new DecimalPipe('en-US');
    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        this.numeroApolice = registro.NumeroApolice;
        this.valorMensal = this.decimalPipe.transform(registro.ValorMensal, '1.2-2').toString().replace('.', ',');
        this.diaPagamento = registro.DiaPagamento;
    }
}
