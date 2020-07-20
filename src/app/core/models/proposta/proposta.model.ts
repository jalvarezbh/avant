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
    observacao: string;
    idUsuario: string;
    idEmpresa: string;
    constructor(registro: any, banco: boolean) {
        if (banco) {
            this.id = registro.Id;
            this.nome = registro.Nome;
            this.email = registro.Email;
            this.celular = registro.Celular;
            this.possuiFilho = registro.PossuiFilho;
            this.numeroApolice = registro.NumeroApolice;
            this.idProduto = registro.IdProduto;
            this.idProdutoValores = registro.IdProdutoValores;
            this.valorMensal = registro.ValorMensal;
            this.formaPagamento = registro.FormaPagamento;
            this.diaPagamento = registro.DiaPagamento;
            this.situacao = registro.Situacao;
            this.idUsuario = registro.IdUsuario;
            this.idEmpresa = registro.IdEmpresa;
            this.ativo = registro.Ativo;
            this.observacao = registro.Observacao;
            this.dataNascimento = new Date(registro.DataNascimento);
            this.dataInicio = new Date(registro.DataInicio);
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
            this.id = registro.id;
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
            this.observacao = registro.observacao;
        }
    }
}
