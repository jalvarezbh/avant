export class PropostaAniversarioModel {
    id: string;
    dia: number;
    nome: string;
    celular: string;

    constructor(registro: any) {
        this.id = registro.Id;
        this.nome = registro.Nome;

        const diaN = new Date(registro.DataNascimento);
        this.dia = diaN.getDate();

        const regCelular = (registro.Celular as string);
        if (regCelular.startsWith('55')) {
            this.celular = '(' + regCelular.substring(2, 4) + ')' + regCelular.substring(4);
        } else {
            this.celular = regCelular;
        }
    }
}
