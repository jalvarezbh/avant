export class AutoCompleteModel {
    id: string;
    descricao: string;

    constructor(registro: any) {
        this.id = registro.Id;
        this.descricao = registro.Descricao;
    }
}