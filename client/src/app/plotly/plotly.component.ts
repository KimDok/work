import { Component, OnInit } from '@angular/core';
import * as Plotly from '../../../node_modules/plotly.js-dist/plotly.js';
import { ApiService } from '../api.service';
import { Sales } from '../sales';

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss']
})

export class PlotlyComponent implements OnInit {

  sales: Sales[] = [];
  data: any[] = [];
  intervalId: any;

  

  constructor(private api: ApiService) { }

  ngOnInit(): void {
   
    var myDiv2: any = document.getElementById("myDiv2");
    var chart: any = document.getElementById("chart");

    // Create visuals
    this.api.getSales()
    .subscribe((res: any) => {
      this.sales = res;
      this.createPlot('myDiv2',this.getData1());
      this.createRealTimePlot(
        this.sales.map(sale => +sale.itemId))
        chart.on("plotly_relayout", function(eventData) {
          console.log(eventData);
          Plotly.relayout("myDiv2", eventData);
        });
    }, err => {
      console.log(err);
    });

   
  }

  getData1() {
    var trace1 = {
      x: this.sales.map(sale => sale.itemId),
      y: this.randomDateArray(new Date(2012, 0, 1), new Date()),
      mode: 'markers',
      type: 'scatter'
    };
    var trace2 = {
      x: this.sales.map(sale => sale.itemId),
      y: this.randomDateArray(new Date(2012, 0, 1), new Date()),
      mode: 'markers',
      type: 'scatter'
    };
    var trace3 = {
      x: this.sales.map(sale => sale.itemId),
      y: this.randomDateArray(new Date(2012, 0, 1), new Date()),
      mode: 'markers',
      type: 'scatter'
    };

    return [trace1, trace2, trace3];
  }

  createPlot(div:string, data) {
    var layout = {
      margin: { t: 30, l: 30, r: 0, b: 25 },
      height: 250      
    };

    Plotly.newPlot(div, data, layout);
  }

  createRealTimePlot(xAxisData) {

    var data = [{
        x:xAxisData,
        y:this.randomDateArray(new Date(2012, 0, 1), new Date()),
        type:'scatter',
        mode:'markers'
      }];

    var layout = {
      margin: { t: 30, l: 30, r: 0, b: 25 },
      height: 250
    };

    Plotly.newPlot('chart', data, layout);

    this.intervalId = setInterval(() => {
      this.api.getSales().subscribe((res) => {
     Plotly.extendTraces('chart', { x:[res.map((r) => r.itemId)], 
    y:[this.randomDateArray(new Date(2020, 0, 1), new Date())]}, [0])
      });
    },1000);
  }

  ngOnDestroy() {
    debugger;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  randomDateArray(start, end) {
    var dateArray : number[] = []
      for (var i = 0; i < this.sales.length; i++ ) {
        dateArray[i] = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getMinutes(); 
      }
      return dateArray
  }
}
