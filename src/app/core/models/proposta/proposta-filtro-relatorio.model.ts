import { isNullOrEmpty } from 'src/app/shared/util/util';

export class PropostaFiltroRelatorioModel {
    nome: string;
    situacao: string;
    dataInicial: string;
    dataFinal: string;
    numeroApolice: number;
    produto: string;
    faixa: string;
    idusuario: string;
    idempresa: string;

    validarUmObrigatorio(): any {
        if (!isNullOrEmpty(this.nome)) {
            return true;
        }
        if (!isNullOrEmpty(this.situacao)) {
            return true;
        }
        if (!isNullOrEmpty(this.dataInicial)) {
            return true;
        }
        if (!isNullOrEmpty(this.dataFinal)) {
            return true;
        }
        if (!isNullOrEmpty(this.numeroApolice)) {
            return true;
        }
        if (!isNullOrEmpty(this.produto)) {
            return true;
        }
        if (!isNullOrEmpty(this.faixa)) {
            return true;
        }

        return false;
    }
}
