import { Component, OnInit, Input } from '@angular/core';
import { PropostaService } from 'src/app/core/services/proposta/proposta.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-card-proposta-mes',
  templateUrl: './card-proposta-mes.component.html',
  styleUrls: ['./card-proposta-mes.component.css']
})
export class CardPropostaMesComponent implements OnInit {

  @Input() viewDate: Date;
  decimalPipe = new DecimalPipe('en-US');
  registros = [];
  totalPendente: string;
  percentualPendente: string;
  percPendente: number;
  totalConfirmado: string;
  percentualConfirmado: string;
  percConfirmado: number;
  totalCancelado: string;
  percentualCancelado: string;
  percCancelado: number;
  totalGeral: string;
  constructor(private propostaService: PropostaService) {
  }

  ngOnInit() {
    const mes = this.viewDate.getMonth() + 1;
    const ano = this.viewDate.getFullYear();
    this.propostaService.getBuscarPropostasInicioMes(mes, ano).subscribe(reg => {
      let valorPendente = 0;
      let valorConfirmado = 0;
      let valorCancelado = 0;
      let valorTotal = 0;
      reg.forEach(element => {
        if (element.Descricao === 'Pendente') {
          this.totalPendente = element.Valor;
          valorPendente += element.Valor;
        } else if (element.Descricao === 'Confirmado') {
          this.totalConfirmado = element.Valor;
          valorConfirmado += element.Valor;
        } else if (element.Descricao === 'Cancelado') {
          this.totalCancelado = element.Valor;
          valorCancelado += element.Valor;
        }
        valorTotal += element.Valor;
      });

      this.percPendente = valorPendente * 100 / valorTotal;
      this.percConfirmado = valorConfirmado * 100 / valorTotal;
      this.percCancelado = valorCancelado * 100 / valorTotal;

      this.totalPendente = this.decimalPipe.transform(valorPendente, '1.0-0').toString().replace('.', ',');
      this.totalConfirmado = this.decimalPipe.transform(valorConfirmado, '1.0-0').toString().replace('.', ',');
      this.totalCancelado = this.decimalPipe.transform(valorCancelado, '1.0-0').toString().replace('.', ',');
      this.totalGeral = this.decimalPipe.transform(valorTotal, '1.0-0').toString().replace('.', ',');
      this.percentualPendente = this.decimalPipe.transform(this.percPendente, '1.2-2').toString().replace('.', ',');
      this.percentualConfirmado = this.decimalPipe.transform(this.percConfirmado, '1.2-2').toString().replace('.', ',');
      this.percentualCancelado = this.decimalPipe.transform(this.percCancelado, '1.2-2').toString().replace('.', ',');

    });
  }
}
