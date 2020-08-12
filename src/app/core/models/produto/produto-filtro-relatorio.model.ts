import { isNullOrEmpty } from 'src/app/shared/util/util';

export class ProdutoFiltroRelatorioModel {
    descricao: string;
    percentual: string;
    capitalSegurado: string;
    idusuario: string;
    idempresa: string;

    validarUmObrigatorio(): any {
        if (!isNullOrEmpty(this.descricao)) {
            return true;
        }
        if (!isNullOrEmpty(this.percentual)) {
            return true;
        }
        if (!isNullOrEmpty(this.capitalSegurado)) {
            return true;
        }
        return false;
    }
}
