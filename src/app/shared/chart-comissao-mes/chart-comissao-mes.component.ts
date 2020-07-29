import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart-comissao-mes',
  templateUrl: './chart-comissao-mes.component.html',
  styleUrls: ['./chart-comissao-mes.component.css']
})
export class ChartComissaoMesComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Pendentes', 'Pagos', 'Cancelados', 'Atrasados'];
  public pieChartData: number[] = [300, 400, 100, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,144,218,1)', 'rgba(164,206,78,1)', 'rgba(199,28,34,1)', 'rgba(210,118,0,1)'],
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
