import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Injectable, Component } from '@angular/core';

@Injectable()
export class CalendarioDataFormatComponet extends CalendarDateFormatter {
    // you can override any of the methods defined in the parent class

    public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
        const diaSemana = new DatePipe(locale).transform(date, 'EEE', locale);

        switch (diaSemana.toUpperCase()) {
            case 'SUN':
                return 'Domingo';
            case 'MON':
                return 'Segunda';
            case 'TUE':
                return 'Terça';
            case 'WED':
                return 'Quarta';
            case 'THU':
                return 'Quinta';
            case 'FRI':
                return 'Sexta';
            case 'SAT':
                return 'Sábado';
        }
        return;
    }

    public monthViewTitle({ date, locale }: DateFormatterParams): string {
        const mes = date.getMonth();
        const ano = date.getFullYear();
        switch (mes) {
            case 1:
                return 'Janeiro / ' + ano;
            case 2:
                return 'Fevereiro / ' + ano;
            case 3:
                return 'Março / ' + ano;
            case 4:
                return 'Abril / ' + ano;
            case 5:
                return 'Maio / ' + ano;
            case 6:
                return 'Junho / ' + ano;
            case 7:
                return 'Julho / ' + ano;
            case 8:
                return 'Agosto / ' + ano;
            case 9:
                return 'Setembro / ' + ano;
            case 10:
                return 'Outubro / ' + ano;
            case 11:
                return 'Novembro / ' + ano;
            case 12:
                return 'Dezembro / ' + ano;
        }

        return new DatePipe(locale).transform(date, 'MMM y', locale);
    }

    public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
        const diaSemana = new DatePipe(locale).transform(date, 'EEE', locale);

        switch (diaSemana.toUpperCase()) {
            case 'SUN':
                return 'Domingo';
            case 'MON':
                return 'Segunda';
            case 'TUE':
                return 'Terça';
            case 'WED':
                return 'Quarta';
            case 'THU':
                return 'Quinta';
            case 'FRI':
                return 'Sexta';
            case 'SAT':
                return 'Sábado';
        }
        return new DatePipe(locale).transform(date, 'EEE', locale);
    }

    public dayViewHour({ date, locale }: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'HH:mm', locale);
    }
}
