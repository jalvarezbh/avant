import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FluxoService } from 'src/app/core/services/fluxo/fluxo.service';

@Component({
  selector: 'app-card-comissao-mes',
  templateUrl: './card-comissao-mes.component.html',
  styleUrls: ['./card-comissao-mes.component.css']
})
export class CardComissaoMesComponent implements OnChanges {

  @Input() viewDate: Date;
  @Input() viewTitulo: boolean;
  decimalPipe = new DecimalPipe('en-US');
  registros = [];
  totalPendente: string;
  percentualPendente: string;
  percPendente: number;
  totalPago: string;
  percentualPago: string;
  percPago: number;
  totalAtrasado: string;
  percentualAtrasado: string;
  percAtrasado: number;
  totalCancelado: string;
  percentualCancelado: string;
  percCancelado: number;
  totalGeral: string;
  constructor(private fluxoService: FluxoService) {
  }

  ngOnChanges() {
    this.atualizaValorData();
  }

  private atualizaValorData() {
    const mes = this.viewDate.getMonth() + 1;
    const ano = this.viewDate.getFullYear();
    this.fluxoService.getBuscarFluxoMensalInicioMes(mes, ano).subscribe(reg => {
      let valorPendente = 0;
      let valorPago = 0;
      let valorAtrasado = 0;
      let valorCancelado = 0;
      let valorTotal = 0;
      reg.forEach(element => {
        if (element.Descricao === '0') {
          this.totalPendente = element.Valor;
          valorPendente += element.Valor;
        } else if (element.Descricao === '1') {
          this.totalPago = element.Valor;
          valorPago += element.Valor;
        } else if (element.Descricao === '2') {
          this.totalAtrasado = element.Valor;
          valorAtrasado += element.Valor;
        } else if (element.Descricao === '3') {
          this.totalCancelado = element.Valor;
          valorCancelado += element.Valor;
        }
        valorTotal += element.Valor;
      });

      if (valorTotal > 0) {
        this.percPendente = valorPendente * 100 / valorTotal;
        this.percPago = valorPago * 100 / valorTotal;
        this.percAtrasado = valorAtrasado * 100 / valorTotal;
        this.percCancelado = valorCancelado * 100 / valorTotal;
      }
      else {
        this.percPendente = 0;
        this.percPago = 0;
        this.percAtrasado = 0;
        this.percCancelado = 0;
      }

      this.totalPendente = this.decimalPipe.transform(valorPendente, '1.2-2').toString().replace('.', ',');
      this.totalPago = this.decimalPipe.transform(valorPago, '1.2-2').toString().replace('.', ',');
      this.totalAtrasado = this.decimalPipe.transform(valorAtrasado, '1.2-2').toString().replace('.', ',');
      this.totalCancelado = this.decimalPipe.transform(valorCancelado, '1.2-2').toString().replace('.', ',');
      this.totalGeral = this.decimalPipe.transform(valorTotal, '1.2-2').toString().replace('.', ',');
      this.percentualPendente = this.decimalPipe.transform(this.percPendente, '1.2-2').toString().replace('.', ',');
      this.percentualPago = this.decimalPipe.transform(this.percPago, '1.2-2').toString().replace('.', ',');
      this.percentualAtrasado = this.decimalPipe.transform(this.percAtrasado, '1.2-2').toString().replace('.', ',');
      this.percentualCancelado = this.decimalPipe.transform(this.percCancelado, '1.2-2').toString().replace('.', ',');

    });
  }
}
