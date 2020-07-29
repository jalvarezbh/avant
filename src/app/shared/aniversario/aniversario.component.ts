import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
    selector: 'app-aniversario',
    templateUrl: './aniversario.component.html'
})
export class AniversarioComponent {

    @Input() view: CalendarView;

    @Input() viewDate: Date;

    @Input() locale = 'en';

    @Output() viewChange = new EventEmitter<CalendarView>();

    @Output() viewDateChange = new EventEmitter<Date>();

    CalendarView = CalendarView;
}
