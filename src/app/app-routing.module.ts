import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AlterarSenhaComponent } from './pages/alterarsenha/alterarsenha.component';
import { PropostaComponent } from './pages/proposta/proposta.component';
import { PropostaPendenteComponent } from './pages/propostapendente/propostapendente.component';
import { PropostaAlterarComponent } from './pages/propostaalterar/propostaalterar.component';
import { PropostaListarComponent } from './pages/propostalistar/propostalistar.component';
import { ComissaoDiariaComponent } from './pages/comissaodiaria/comissaodiaria.component';
import { ComissaoPeriodoComponent } from './pages/comissaoperiodo/comissaoperiodo.component';

const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { extraParameter: '' } },
      { path: '', component: LoginComponent, data: { extraParameter: '' } }
    ]
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { extraParameter: '' } },
      { path: 'comissaodiaria', component: ComissaoDiariaComponent, data: { extraParameter: 'comissaoForm' } },
      { path: 'comissaoperiodo', component: ComissaoPeriodoComponent, data: { extraParameter: 'comissaoForm' } },
      { path: 'proposta', component: PropostaComponent, data: { extraParameter: 'propostaForm' } },
      { path: 'propostapendente', component: PropostaPendenteComponent, data: { extraParameter: 'propostaForm' } },
      { path: 'propostalistar', component: PropostaListarComponent, data: { extraParameter: 'propostaForm' } },
      { path: 'propostaalterar', component: PropostaAlterarComponent, data: { extraParameter: 'propostaForm' } },
      { path: 'usuario', component: UsuarioComponent, data: { extraParameter: 'cadastroForm' } },
      { path: 'alterarsenha', component: AlterarSenhaComponent, data: { extraParameter: 'cadastroForm' } },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
