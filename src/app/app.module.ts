// @ANGULAR
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {
  MatNativeDateModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MAT_CHECKBOX_CLICK_ACTION,
  MatRadioModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// @NG
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxCurrencyModule } from 'ngx-currency';

// SERVICES
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LoadingService } from './core/loading/loading.service';
import { rootReducer, ArchitectUIState } from './theme';
import { ConfigActions } from './theme/config.actions';

// APP
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// LAYOUT
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { PageTitleComponent } from './layout/components-layout/page-title/page-title.component';

// HEADER
import { HeaderComponent } from './layout/components-layout/header/header.component';
import { MenuHeaderComponent } from './layout/components-layout/header/elements/menu-header/menu-header.component';
import { UserBoxComponent } from './layout/components-layout/header/elements/user-box/user-box.component';

// SIDEBAR
import { SidebarComponent } from './layout/components-layout/sidebar/sidebar.component';
import { LogoComponent } from './layout/components-layout/sidebar/elements/logo/logo.component';

// FOOTER
import { FooterComponent } from './layout/components-layout/footer/footer.component';

// PAGES
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AlterarSenhaComponent } from './pages/alterarsenha/alterarsenha.component';
import { PropostaComponent } from './pages/proposta/proposta.component';
import { PropostaAlterarComponent } from './pages/propostaalterar/propostaalterar.component';
import { PropostaListarComponent } from './pages/propostalistar/propostalistar.component';
import { PropostaPendenteComponent } from './pages/propostapendente/propostapendente.component';
import { CalendarioComponent } from './shared/calendario/calendario.component';
import { AniversarioComponent } from './shared/aniversario/aniversario.component';
import { ComissaoDiariaComponent } from './pages/comissaodiaria/comissaodiaria.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null
};

@NgModule({
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,
    HeaderComponent,
    MenuHeaderComponent,
    UserBoxComponent,
    SidebarComponent,
    LogoComponent,
    FooterComponent,
    AniversarioComponent,
    CalendarioComponent,
    HomeComponent,
    LoginComponent,
    LoadingComponent,
    UsuarioComponent,
    AlterarSenhaComponent,
    PropostaComponent,
    PropostaPendenteComponent,
    PropostaAlterarComponent,
    PropostaListarComponent,
    ComissaoDiariaComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingBarRouterModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    NgbModule,
    NgReduxModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    Ng2TelInputModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    TextMaskModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,

    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' }
    },
    {
      provide: MAT_CHECKBOX_CLICK_ACTION,
      useValue: 'check'
    },
    ConfigActions,
    LoadingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>, devTool: DevToolsExtension) {
    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );
  }
}
