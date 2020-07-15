import {Component, OnInit} from '@angular/core';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ConfigActions} from '../../theme/config.actions';
import {ThemeOptions} from '../../theme-options';

@Component({
  selector: 'app-pages-layout',
  templateUrl: './pages-layout.component.html',
  styleUrls: ['./pages-layout.component.css'],
  animations: [

    trigger('architectUIAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            opacity: 0,
            display: 'flex',
            flex: '1',
            flexDirection: 'column'

          }),
        ]),
        query(':enter', [
          animate('600ms ease', style({opacity: 1})),
        ]),

        query(':leave', [
          animate('600ms ease', style({opacity: 0})),
        ], {optional: true})
      ]),
    ])
  ]
})
export class PagesLayoutComponent implements OnInit {

  @select('config') public config$: Observable<any>;

  constructor(public globals: ThemeOptions, public configActions: ConfigActions) {
  }

  ngOnInit() {
  }

}
