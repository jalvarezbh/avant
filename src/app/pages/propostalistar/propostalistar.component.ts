import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { PropostaListaModel } from 'src/app/core/models';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-propostalistar',
    templateUrl: './propostalistar.component.html',
    styleUrls: ['propostalistar.component.css']
})

export class PropostaListarComponent implements OnInit {
    dataSource: MatTableDataSource<PropostaListaModel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    columnsToDisplay = ['nome', 'numeroApolice', 'valorMensal', 'situacao', 'ativo', 'id'];

    constructor(
        private router: Router,
        private loginService: LoginService,
        private propostaService: PropostaService) {
    }

    ngOnInit() {
        if (this.loginService.getUserLogon()) {
            this.propostaService.getBuscarPropostas().then(reg => {
                this.dataSource = new MatTableDataSource(reg.map(m => new PropostaListaModel(m)));
                this.dataSource.sort = this.sort;
                this.paginator._intl.itemsPerPageLabel = 'Itens por página';
                this.dataSource.paginator = this.paginator;
                this.dataSource.filterPredicate = function customFilter(data, filter: string): boolean {
                    const palavra = data.ativo ? 'sim' : 'não';
                    return (data.nome.indexOf(filter) !== -1 ||
                        data.numeroApolice.toString().indexOf(filter) !== -1 ||
                        data.valorMensal.toString().indexOf(filter) !== -1 ||
                        data.situacao.indexOf(filter) !== -1 ||
                        palavra.indexOf(filter) !== -1);
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

    editar(id: string) {
        this.router.navigateByUrl('propostaalterar?id=' + id);
    }
}
