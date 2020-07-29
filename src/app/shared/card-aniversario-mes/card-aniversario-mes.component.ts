import { Component, OnInit, Input } from '@angular/core';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { PropostaAniversarioModel } from 'src/app/core/models';

@Component({
  selector: 'app-card-aniversario-mes',
  templateUrl: './card-aniversario-mes.component.html',
  styleUrls: ['./card-aniversario-mes.component.css']
})
export class CardAniversarioMesComponent implements OnInit {

  @Input() viewDate: Date;
  aniversarios: PropostaAniversarioModel[] = [];
  constructor(private propostaService: PropostaService) {
  }

  ngOnInit() {

    const mes = this.viewDate.getMonth() + 1;

    this.propostaService.getBuscarPropostasAniversariantes(mes).subscribe(reg => {
      this.aniversarios = reg.map(m => new PropostaAniversarioModel(m));
    });
  }
}
