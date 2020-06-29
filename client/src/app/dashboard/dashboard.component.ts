import { Component, OnInit } from '@angular/core';
import * as Plotly from '../../../node_modules/plotly.js-dist/plotly.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  gpuPipeQ: number
  gpuPipeTi1: number
  gpuPipeTi2: number
  gpuUI: number    

  capacityData: number[]

  constructor() { }

  ngOnInit(): void {
    
    this.capacityData = [75, 67];

    this.gpuPipeQ = 56.8;
    this.gpuPipeTi1 = 10.5;
    this.gpuPipeTi2 = 77.9;
    this.gpuUI = 70.8;

    this.capacityVisual('capacityVisual', this.capacityData)

    //this.ramCpuVisual('ramCpuVisual',this.cpuRamData)
    this.ramVisual('ramStorageVisual', [77], 'storage','RAM','#00BCD4')
    this.ramVisual('ramPipeVisual', [56], 'Pipe','RAM','#00BCD4')
    this.ramVisual('ramUIVisual', [88], 'UI','RAM','#00BCD4')
    this.ramVisual('cpuStorageVisual', [45], 'storage','CPU','#01579B')
    this.ramVisual('cpuPipeVisual', [37], 'Pipe','CPU','#01579B')
    this.ramVisual('cpuUIVisual', [55], 'UI','CPU','#01579B')


    this.gpuVisual('gpuVisual', [33,55],  'GPU pipe Quadro', ['#900c3f', '#900c3f61'])
    this.gpuVisual('gpuVisual1', [34,78],  'GPU pipe 2080ti', ['#c70039','#c7003961'])
    this.gpuVisual('gpuVisual2', [12,15],  'GPU pipe 2080ti', ['#ff5733','#ff573361'])
    this.gpuVisual('gpuVisual3', [45,78],  'GPU UI 2080ti', ['#ffc300','#ffc30061'])

  }

  capacityVisual(divName: string, data: number[]){
    var dataStorage = {
      x: ['Storage'],
      y: [81],
      marker: {
        color:[]
      },
      text: '81',
      textposition: 'outside',
      type: 'bar'
    };
    
    dataStorage.marker.color = dataStorage.y.map(function (v) {
        return v > 80 ? '#f44336' : '#4caf50'
      });

    var dataCapacity = {
      x: ['Pipe', 'UI'],
      y: data,
      marker: {
        color:[]
      },
      text: data.map(String),
      textposition: 'outside',
      type: 'bar'
    };
      
    var layout: any = {
      title: 'Capacity',
      margin: { t: 30, l: 30, r: 0, b: 25 },
      yaxis: {
        //mirror: true,
        range: [0, 100],
        linewidth: 1
      },
      xaxis: {
        //mirror: true,
        //linewidth: 1
      },
      height: 335,  
      width: 100,
      images: [
        {
          x: 0.8,
          y: 1.04,
          sizex: 0.12,
          sizey: 0.12,
          source: '../../assets/images/database-icon.png',
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        }
      ]
    };

    dataCapacity.marker.color = dataCapacity.y.map(function (v) {
      return v > 80 ? '#f44336' : '#4caf50'
    });
  
    Plotly.newPlot('capacityStorage', [dataStorage], layout, {displayModeBar: false});
    Plotly.newPlot(divName, [dataCapacity], layout, {displayModeBar: false});
    
  }

  ramVisual(divName: string, data, serverName: string, title: string, color:string){

    var dataRam = [{
      type: 'bar',
      x: data,
      y: [serverName + ' ' + title],
      orientation: 'h',
      text: (data).toString(),
      textposition: 'outside',
      marker: {
        color:[color]
      },
      hovertemplate: '%{x}'
    }];

    var layoutRam: any = {
      margin: { t: 5, b: 5 },
      xaxis:{
        range: [0, 100],
        linewidth:1,
        visible: false
      },
      height: 24,
    };
    
    Plotly.newPlot(divName, dataRam, layoutRam, {displayModeBar: false});
  }

 /* ramCpuVisual(divName: string, data) {
   
    var dataCpu = {
      type: 'bar',
      x: data.cpu,
      y: ['Storage','Pipe', 'UI'],
      name:'CPU',
      orientation: 'h'
    };
    

    var dataRam = {
      type: 'bar',
      x: data.ram,
      y: ['Storage','Pipe', 'UI'],
      name:'RAM',
      orientation: 'h'
    };

    var graphData = [dataCpu, dataRam];

    var layout: any = {
      title : 'CPU vs RAM',
      margin: { t: 40, b: 35 },
      xaxis:{
        //mirror: true,
        range: [0, 100],
       // linewidth: 1
      },
      yaxis: {
       // mirror: true,
       // linewidth: 1
      },
      height: 300,
      images: [
        {
          x: 0.61,
          y: 1.06,
          sizex: 0.06,
          sizey: 0.06,
          source: '../../assets/images/ram-icon.jpg',
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        },
        {
          x: 0.4,//0.44,
          y: 1.06,
          sizex: 0.06,
          sizey: 0.06,
          source: '../../assets/images/cpu-icon.png',
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        }
      ]
    };
    
    Plotly.newPlot(divName, graphData, layout, {displayModeBar: false});
  }*/

  gpuVisual(divName:string, data, title: string, colors: string[]) {
    var dataGpu = [{
      values: data,
      labels: ['used', 'unused'],
      marker: {'colors': colors},
      hole: .5,
      type: 'pie'
    }];
    
    var layout = {
      title: title,
      margin: { t: 30, l: 0, r: 0, b: 25 },      
      height: 150,
      width: 150,
      showlegend: false
    };
    
    Plotly.newPlot(divName, dataGpu, layout, {displayModeBar: false});
    
  }

}
