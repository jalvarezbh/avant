import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html'
})
export class CalendarioComponent {

    @Input() view: CalendarView;

    @Input() viewDate: Date;

    @Input() locale = 'en';

    @Output() viewChange = new EventEmitter<CalendarView>();

    @Output() viewDateChange = new EventEmitter<Date>();

    CalendarView = CalendarView;
}
