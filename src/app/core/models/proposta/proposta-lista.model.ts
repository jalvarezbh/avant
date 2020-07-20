export class PropostaListaModel {
    id: string;
    nome: string;
    numeroApolice: number;
    valorMensal: number;
    situacao: string;
    ativo: boolean;
    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        this.numeroApolice = registro.NumeroApolice;
        this.valorMensal = registro.ValorMensal;
        this.situacao = registro.Situacao;
        this.ativo = registro.Ativo;
    }
}
