export class ProdutoModel {
    id: string;
    descricao: string;
    cobertura: string;
    idempresa: string;

    constructor(registro: any) {
        this.id = registro.Id;
        this.descricao = registro.Descricao;
        this.cobertura = registro.Cobertura;
        this.idempresa = registro.Id_Empresa;
    }
}
