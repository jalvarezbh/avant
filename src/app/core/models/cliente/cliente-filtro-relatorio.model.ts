import { isNullOrEmpty } from 'src/app/shared/util/util';

export class ClienteFiltroRelatorioModel {
    nome: string;
    possuiFilhos: string;
    mesInicial: string;
    mesFinal: string;
    genero: string;
    idusuario: string;
    idempresa: string;

    validarUmObrigatorio(): any {
        if (!isNullOrEmpty(this.nome)) {
            return true;
        }
        if (!isNullOrEmpty(this.possuiFilhos)) {
            return true;
        }
        if (!isNullOrEmpty(this.mesInicial)) {
            return true;
        }
        if (!isNullOrEmpty(this.mesFinal)) {
            return true;
        }
        if (!isNullOrEmpty(this.genero)) {
            return true;
        }
        return false;
    }
}
