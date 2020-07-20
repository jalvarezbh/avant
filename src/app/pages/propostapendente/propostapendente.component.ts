import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { PropostaPendenteModel } from 'src/app/core/models';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'app-propostapendente',
    templateUrl: './propostapendente.component.html',
    styleUrls: ['propostapendente.component.css']
})

export class PropostaPendenteComponent implements OnInit {
    dataSource: MatTableDataSource<PropostaPendenteModel>;
    @ViewChild(MatSort) sort: MatSort;
    columnsToDisplay = ['nome', 'numeroApolice', 'valorMensal', 'diaPagamento', 'id'];

    constructor(
        private router: Router,
        private loginService: LoginService,
        private propostaService: PropostaService) {
    }

    ngOnInit() {
        if (this.loginService.getUserLogon()) {
            this.propostaService.getBuscarPropostasPendente().then(reg => {
                this.dataSource = new MatTableDataSource(reg.map(m => new PropostaPendenteModel(m)));
                this.dataSource.sort = this.sort;
                this.dataSource.filterPredicate = function customFilter(data, filter: string): boolean {
                    return (data.nome.indexOf(filter) !== -1 ||
                        data.numeroApolice.toString().indexOf(filter) !== -1 ||
                        data.valorMensal.toString().indexOf(filter) !== -1 ||
                        data.diaPagamento.toString().indexOf(filter) !== -1);
                };
            });
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    pesquisar(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
