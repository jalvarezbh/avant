import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { Injectable } from '@angular/core';

export const colors: any = {
    blue: {
        primary: '#d1f3ff',
        secondary: '#d1f3ff',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Injectable()
export class AniversarioDataFormatComponet extends CalendarDateFormatter {

    public dayViewTitle({ date }: DateFormatterParams): string {
        const mes = date.getMonth();
        const ano = date.getFullYear();
        switch (mes) {
            case 1:
                return 'Aniversariantes de Janeiro / ' + ano;
            case 2:
                return 'Aniversariantes de Fevereiro / ' + ano;
            case 3:
                return 'Aniversariantes de Março / ' + ano;
            case 4:
                return 'Aniversariantes de Abril / ' + ano;
            case 5:
                return 'Aniversariantes de Maio / ' + ano;
            case 6:
                return 'Aniversariantes de Junho / ' + ano;
            case 7:
                return 'Aniversariantes de Julho / ' + ano;
            case 8:
                return 'Aniversariantes de Agosto / ' + ano;
            case 9:
                return 'Aniversariantes de Setembro / ' + ano;
            case 10:
                return 'Aniversariantes de Outubro / ' + ano;
            case 11:
                return 'Aniversariantes de Novembro / ' + ano;
            case 12:
                return 'Aniversariantes de Dezembro / ' + ano;
        }

        return 'Aniversariantes';
    }

    public dayViewHour({ date }: DateFormatterParams): string {
        const consulta = (JSON.parse(localStorage.getItem('daysNiver')) as Array<number>);
        if (consulta !== null && consulta.length > 0) {
            const variavel = consulta.pop();
            localStorage.setItem('daysNiver', JSON.stringify(consulta));
            return variavel.toString();
        }
        return '';
    }
}
