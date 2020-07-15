export class UsuarioModel {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    celular: string;
    senha: string;
    idempresa: string;

    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        this.email = registro.Email;
        this.cpf = registro.CPF;
        this.telefone = registro.Telefone;
        this.celular = registro.Celular;
        this.idempresa = registro.Id_Empresa;
    }
}
