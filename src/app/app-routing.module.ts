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
import { ComparativoComissaoComponent } from './pages/comparativocomissao/comparativocomissao.component';
import { ComparativoPropostaComponent } from './pages/comparativoproposta/comparativoproposta.component';
import { RelatorioComissaoComponent } from './pages/relatoriocomissao/relatoriocomissao.component';
import { RelatorioPropostaComponent } from './pages/relatorioproposta/relatorioproposta.component';
import { RelatorioClienteComponent } from './pages/relatoriocliente/relatoriocliente.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RedefinirSenhaComponent } from './pages/redefinirsenha/redefinirsenha.component';

const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { extraParameter: '' } },
      { path: 'cadastro', component: CadastroComponent, data: { extraParameter: '' } },
      { path: 'redefinir', component: RedefinirSenhaComponent, data: { extraParameter: '' } },
      { path: '', component: InicialComponent, data: { extraParameter: '' } }
    ]
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { extraParameter: '' } },
      { path: 'comparativocomissao', component: ComparativoComissaoComponent, data: { extraParameter: 'comparativoForm' } },
      { path: 'comparativoproposta', component: ComparativoPropostaComponent, data: { extraParameter: 'comparativoForm' } },
      { path: 'comissaodiaria', component: ComissaoDiariaComponent, data: { extraParameter: 'comissaoForm' } },
      { path: 'comissaoperiodo', component: ComissaoPeriodoComponent, data: { extraParameter: 'comissaoForm' } },
      { path: 'proposta', component: PropostaComponent, data: { extraParameter: 'propostaForm' } },
      { path: 'propostapendente', component: PropostaPendenteComponent, data: { extraParameter: 'propostaForm' } },
      { path: 'propostalistar', component: PropostaListarComponent, data: { extraParameter: 'propostaForm' } },
      { path: 'propostaalterar', component: PropostaAlterarComponent, data: { extraParameter: 'propostaForm' } },
      { path: 'relatoriocliente', component: RelatorioClienteComponent, data: { extraParameter: 'relatorioForm' } },
      { path: 'relatoriocomissao', component: RelatorioComissaoComponent, data: { extraParameter: 'relatorioForm' } },
      { path: 'relatorioproposta', component: RelatorioPropostaComponent, data: { extraParameter: 'relatorioForm' } },
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
