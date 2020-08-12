import { DatePipe } from '@angular/common';

export class ClienteListaRelatorioModel {
    id: string;
    nome: string;
    celular: string;
    email: string;
    dataNascimento: string;
    genero: string;
    possuiFilhos: string;
    datepipe = new DatePipe('en-US');
    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;
        const regCelular = (registro.Celular as string);
        if (regCelular.startsWith('55')) {
            this.celular = '(' + regCelular.substring(2, 4) + ')' + regCelular.substring(4);
        } else {
            this.celular = regCelular;
        }
        this.email = registro.Email;
        this.dataNascimento = this.datepipe.transform(new Date(registro.DataNascimento), 'dd/MM/yyyy');
        this.possuiFilhos = registro.PossuiFilho ? 'Sim' : 'Não';

        switch (registro.Genero) {
            case 'F':
                this.genero = 'Feminino';
                break;
            case 'M':
                this.genero = 'Masculino';
                break;
            default:
                this.genero = 'Não Informado';
        }
    }
}
