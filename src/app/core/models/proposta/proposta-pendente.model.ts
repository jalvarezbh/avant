export class PropostaPendenteModel {
    id: string;
    nome: string;
    numeroApolice: number;
    valorMensal: number;
    diaPagamento: number;

    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        this.numeroApolice = registro.NumeroApolice;
        this.valorMensal = registro.ValorMensal;
        this.diaPagamento = registro.DiaPagamento;
    }
}
