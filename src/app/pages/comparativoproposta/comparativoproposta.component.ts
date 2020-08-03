import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { LoginService } from 'src/app/core/services/login/login.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MM YYYY',
    },
};

@Component({
    selector: 'app-comparativoproposta',
    templateUrl: './comparativoproposta.component.html',
    styleUrls: ['./comparativoproposta.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})

export class ComparativoPropostaComponent implements OnInit {
    viewDateA = new Date();
    viewDateB = new Date();
    dateMesA: FormControl;
    dateMesB: FormControl;

    constructor(
        private router: Router,
        private loginService: LoginService) { }

    ngOnInit(): void {
        if (this.loginService.getUserLogon()) {
            this.viewDateA.setMonth(this.viewDateA.getMonth() - 1);
            this.dateMesA = new FormControl({ value: moment([this.viewDateA.getFullYear(), this.viewDateA.getMonth(), this.viewDateA.getDate()]), disabled: true });
            this.dateMesB = new FormControl({ value: moment([this.viewDateB.getFullYear(), this.viewDateB.getMonth(), this.viewDateB.getDate()]), disabled: true });
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    chosenMonthHandlerA(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.dateMesA.value;
        ctrlValue.month(normalizedMonth.month());
        this.dateMesA.setValue(ctrlValue);
        this.viewDateA = new Date(ctrlValue);
        datepicker.close();
    }

    chosenMonthHandlerB(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.dateMesB.value;
        ctrlValue.month(normalizedMonth.month());
        this.dateMesB.setValue(ctrlValue);
        this.viewDateB = new Date(ctrlValue);
        datepicker.close();
    }
}
