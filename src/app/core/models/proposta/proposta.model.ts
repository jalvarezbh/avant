export class PropostaModel {
    id: string;
    nome: string;
    email: string;
    celular: string;
    dataNascimento: Date;
    possuiFilho: boolean;
    numeroApolice: number;
    idProduto: string;
    idProdutoValores: string;
    valorMensal: number;
    formaPagamento: string;
    diaPagamento: number;
    dataInicio: Date;
    situacao: string;
    ativou: boolean;
    idUsuario: string;
    idEmpresa: string;

    constructor(registro: any, banco: boolean) {
        if (banco) {
            this.id = registro.Id;
        }
        else {

        }
    }
}
