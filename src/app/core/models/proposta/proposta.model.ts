import { DatePipe } from '@angular/common';

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
    ativo: boolean;
    idUsuario: string;
    idEmpresa: string;
    constructor(registro: any, banco: boolean) {
        if (banco) {
            this.id = registro.Id;
        }
        else {

            const dataNascimentoSplit = registro.dataNascimento.split('/');
            if (dataNascimentoSplit.length === 3) {
                this.dataNascimento = new Date(dataNascimentoSplit[2], dataNascimentoSplit[1] - 1, dataNascimentoSplit[0]);
            }

            const dataInicioSplit = registro.dataInicio.split('/');
            if (dataInicioSplit.length === 3) {
                this.dataInicio = new Date(dataInicioSplit[2], dataInicioSplit[1] - 1, dataInicioSplit[0]);
            }

            this.nome = registro.nome;
            this.email = registro.email;
            this.celular = registro.celular;
            this.possuiFilho = registro.possuifilhos;
            this.numeroApolice = registro.numeroApolice;
            this.idProduto = registro.produto;
            this.idProdutoValores = registro.faixa;
            this.valorMensal = registro.valorMensalPago;
            this.formaPagamento = registro.pagamento;
            this.diaPagamento = registro.diaPagamento;
            this.situacao = registro.situacao;
            this.ativo = registro.ativo;
        }
    }
}
