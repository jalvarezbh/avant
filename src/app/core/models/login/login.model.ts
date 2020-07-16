export class LoginModel {
    id: string;
    nome: string;
    email: string;
    senha: string;
    idempresa: string;

    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        this.email = registro.Email;
        this.idempresa = registro.IdEmpresa;
    }
}
