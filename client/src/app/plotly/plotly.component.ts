import { Component, OnInit } from '@angular/core';
import * as Plotly from '../../../node_modules/plotly.js-dist/plotly.js';
import { ApiService } from '../api.service';
import { Sales } from '../sales';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss']
})

export class PlotlyComponent implements OnInit {

  campaignOne: FormGroup;

  sales: Sales[] = [];
  data: any[] = [];
  intervalId: any;

  constructor(private api: ApiService) { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });
  }

  ngOnInit(): void {
   
    var heatmapVisual: any = document.getElementById("heatmapVisual");
    var scatterVisual: any = document.getElementById("scatterVisual");

    // Create visuals
    this.api.getSales()
    .subscribe((res: any) => {
      this.sales = res;
      this.createHeatmapVisual()
      this.createScatterVisual('scatterVisual',this.getData1());
      // this.createRealTimePlot(
      //   this.sales.map(sale => +sale.itemId))
      heatmapVisual.on("plotly_relayout", function(eventData) {
          console.log(eventData);
          Plotly.relayout("scatterVisual", eventData);
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

  createScatterVisual(div:string, data) {
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

  createrow() {

    var row = []
    
    for (var j=0; j<2500; j++) {
      row[j] = 1
    }
    
    for(var col =0; col<2500 ;col+=500) {
      for (var j=col+40; j<col+51 ; j++) {
        row[j] = 6
      }
      
     
    }
    
    return(row)

  }

  createrow1() {

    var row = []
    
    for (var j=0; j<2500; j++) {
      row[j] = 1
    }
    
    for(var col =0; col<2500 ;col+=500) {
      for (var j=col+30; j<col+61 ; j++) {
        row[j] = 3
      }
    }
    
    return(row)

  }

  createrow2() {
    var row = []
    for (var j=0; j<2500; j++) {
      row[j] = 1
    }

    for(var col =0; col<2500 ;col+=500) {
      
      for (var j=col+20; j<col+71 ; j++) {
        row[j] = 6
      }

    }
    
    return(row)

  }

  createrow3() {
    var row = []
    for (var j=0; j<2500; j++) {
      row[j] = 1
    }

    for(var col =0; col<2500 ;col+=500) {
      
      for (var j=col+10; j<col+81 ; j++) {
        row[j] = 2
      }

    }
    
    return(row)

  }

  createHeatmapVisual() {
    var values = []
      for(var i=0; i<186;i=i+14) {
        values[i] = this.createrow()
        values[i+1] = this.createrow()
        values[i+2] = this.createrow1()
        values[i+3] = this.createrow1()
        values[i+4] = this.createrow2()
        values[i+5] = this.createrow2()
        values[i+6] = this.createrow3()
        values[i+7] = this.createrow3()
        values[i+8] = this.createrow2()
        values[i+9] = this.createrow2()
        values[i+10] = this.createrow1()
        values[i+11] = this.createrow1()
        values[i+12] = this.createrow()
        values[i+13] = this.createrow()
      }
      
      var xValues = [];
      
      for(var i =0; i<2500;i++) {
        xValues[i] = i
      }

      var arr = [];
      for(var i=0; i<24; i++) {
        for(var j=0; j<4; j++) {
          for(var k=0;k<4;k++){
            arr.push(i + ":" + (j===0 ? "00" : 15*j) + ":" + (k===0 ? "00" : 15*k) );
          }
        }
      }

      var yValues = arr.slice(0,190)
      var zValues = values

      var colorscaleValue = [
        [0, '#ffffff'],
        [0.1, '#ffffff'],

        [0.1, '#c70039'],
        [0.2, '#c70039'],

        [0.2, '#ff5733'],
        [0.3, '#ff5733'],

        [0.3, '#ff8d1a'],
        [0.4, '#ff8d1a'],

        [0.4, '#ffc300'],
        [0.5, '#ffc300'],

        [0.5, '#eddd53'],
        [0.6, '#eddd53'],

        [0.6, '#add45e'],
        [0.7, 'add45e'],

        [0.7, '#57c785'],
        [0.8, '#57c785'],

        [0.8, '#00baad'],
        [0.9, '#00baad'],

        [0.9, '#2a7b9b'],
        [1.0, '#2a7b9b']
      ];

      var data = [{
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'heatmap',
        colorscale: colorscaleValue,//'Jet',
        showscale: true
      }];

      var layout = {
        title: 'Annotated Heatmap',
        annotations: [],
        xaxis: {
          ticks: '',
          side: 'top'
        },
        yaxis: {
          ticks: '',
          ticksuffix: ' ',
          width: 700,
          height: 700,
          autosize: false
        }
      };

    Plotly.newPlot('heatmapVisual', data, layout);
  }

  heatmapVisual2() {
    var values = []
      for(var i=0; i<186;i=i+14) {
        values[i] = this.createrow()
        values[i+1] = this.createrow()
        values[i+2] = this.createrow1()
        values[i+3] = this.createrow1()
        values[i+4] = this.createrow1()
        values[i+5] = this.createrow1()
        values[i+6] = this.createrow1()
        values[i+7] = this.createrow1()
        values[i+8] = this.createrow2()
        values[i+9] = this.createrow2()
        values[i+10] = this.createrow1()
        values[i+11] = this.createrow1()
        values[i+12] = this.createrow()
        values[i+13] = this.createrow()
      }
      
      var xValues = [];
      
      for(var i =0; i<2500;i++) {
        xValues[i] = i
      }

      var arr = [];
      for(var i=0; i<24; i++) {
        for(var j=0; j<4; j++) {
          for(var k=0;k<4;k++){
            arr.push(i + ":" + (j===0 ? "00" : 15*j) + ":" + (k===0 ? "00" : 15*k) );
          }
        }
      }

      var yValues = arr.slice(0,190)
      var zValues = values

      var colorscaleValue = [
        [0, '#ffffff'],
        [0.1, '#ffffff'],

        [0.1, '#c70039'],
        [0.2, '#c70039'],

        [0.2, '#ff5733'],
        [0.3, '#ff5733'],

        [0.3, '#ff8d1a'],
        [0.4, '#ff8d1a'],

        [0.4, '#ffc300'],
        [0.5, '#ffc300'],

        [0.5, '#eddd53'],
        [0.6, '#eddd53'],

        [0.6, '#add45e'],
        [0.7, 'add45e'],

        [0.7, '#57c785'],
        [0.8, '#57c785'],

        [0.8, '#00baad'],
        [0.9, '#00baad'],

        [0.9, '#2a7b9b'],
        [1.0, '#2a7b9b']
      ];

      var data = [{
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'heatmap',
        colorscale: colorscaleValue,//'Jet',
        showscale: true
      }];

      var layout = {
        title: 'Annotated Heatmap',
        annotations: [],
        xaxis: {
          ticks: '',
          side: 'top'
        },
        yaxis: {
          ticks: '',
          ticksuffix: ' ',
          width: 700,
          height: 700,
          autosize: false
        }
      };

    Plotly.newPlot('heatmapVisual', data, layout);
  }


  selectObjects(value) {
    
    // show without noise
    if(value.checked) {
      this.heatmapVisual2()
    //   var values = []
    //   for(var i=0; i<186;i=i+14) {
    //     values[i] = this.createrow()
    //     values[i+1] = this.createrow()
    //     values[i+2] = this.createrow1()
    //     values[i+3] = this.createrow1()
    //     values[i+4] = this.createrow1()
    //     values[i+5] = this.createrow1()
    //     values[i+6] = this.createrow2()
    //     values[i+7] = this.createrow2()
    //     values[i+8] = this.createrow2()
    //     values[i+9] = this.createrow2()
    //     values[i+10] = this.createrow1()
    //     values[i+11] = this.createrow1()
    //     values[i+12] = this.createrow()
    //     values[i+13] = this.createrow()
    //   }
    //   var data = [{
    //     z: values,
    //   }];
      
    //   Plotly.restyle('myDiv3', data )
     }
     else {
       this.createHeatmapVisual()
     }
    console.log('toggle ' + value.checked)
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
