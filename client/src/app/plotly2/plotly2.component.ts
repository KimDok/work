import { Component, OnInit } from '@angular/core';
import * as Plotly from '../../../node_modules/plotly.js-dist/plotly.js';

@Component({
  selector: 'app-plotly2',
  templateUrl: './plotly2.component.html',
  styleUrls: ['./plotly2.component.scss']
})
export class Plotly2Component implements OnInit {

  constructor() { }

   ngOnInit(): void {
    var myDiv : any = document.getElementById("myDiv");
    var myDiv2 : any = document.getElementById("myDiv2");
    var myDiv3 : any = document.getElementById("myDiv3");
    var startTime = new Date().getTime();
    var timeStep = 60000;
    var myDivMax = 70;
    var myDiv2Max = 9000;
    var myDiv3Max = 500;
    
    var d3 = Plotly.d3,
      N = 40,
      x = d3.range(N).map(() => {
        return new Date((startTime += timeStep));
      }),
      y = d3.range(N).map(() => Math.random() * myDivMax),
      data = [{ x: x, y: y }];

    var layout = {
      type:'scatter',
      mode:'markers',
      height: 200,
      margin: { l: 45, t: 5, r: 45, b: 45 },
      xaxis: {
        tickfont: {
          size: 10,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        fixedrange: true,
        tickfont: {
          size: 10,
          color: '#7f7f7f'
        }
      }
    };

    var layout2 = {
      height: 200,
      margin: { l: 45, t: 5, r: 45, b: 45 },
      xaxis: {
        tickfont: {
          size: 10,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        fixedrange: true,
        tickfont: {
          size: 10,
          color: '#7f7f7f'
        }
      }
    };

    var layout3 = {
      height: 200,
      margin: { l: 45, t: 5, r: 45, b: 45 },
      xaxis: {
        tickfont: {
          size: 10,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        fixedrange: true,
        tickfont: {
          size: 10,
          color: '#7f7f7f'
        }
      }
    };

    var layout4 = {
      type: 'scatter',
      mode: 'markers',
      name: 'random data',
    };
    
    Plotly.plot(myDiv, data, layout);
    var data2 = [{ x: x, y: d3.range(N).map(() => Math.random() * myDiv2Max) }];
    Plotly.plot(myDiv2, data2, layout2);
    var data3 = [{ x: x, y: d3.range(N).map(() => Math.random() * myDiv3Max) }];
   // Plotly.plot(myDiv3, data3, layout3);

    Plotly.plot(myDiv3, data3, layout4)
    
    var divs = [myDiv, myDiv2, myDiv3];
    
    function relayout(ed, divs) {
      divs.forEach((div, i) => {
        let x = div.layout.xaxis;
        if (ed["xaxis.autorange"] && x.autorange) return;
        if (x.range[0] != ed["xaxis.range[0]"] || x.range[1] != ed["xaxis.range[1]"])
          Plotly.relayout(div, ed);      
      });
    }
    
    var plots = [myDiv, myDiv2, myDiv3];
    plots.forEach(div => {
      div.on("plotly_relayout", function(ed) {
        console.log(ed)
        relayout(ed, divs);
      });
    });
    
    var graphDiv : any  = document.getElementById('graph');
    var N = 1000;
    var color1 = '#7b3294';
    var color1Light = '#c2a5cf';
    var colorX = '#ffa7b5';
    var colorY = '#fdae61';

    function randomArray() {
      var out = new Array(N);
      for(var i = 0; i < N; i++) {
        out[i] = Math.random();
      }
      return out;
    }
    var x = randomArray();
    var y = randomArray();

    Plotly.plot(graphDiv, [{
      type: 'scatter',
      mode: 'markers',
      x: x,
      y: y,
      xaxis: 'x',
      yaxis: 'y',
      name: 'random data',
      marker: {color: color1, size: 10}
    }, {
      type: 'histogram',
      x: x,
      xaxis: 'x2',
      yaxis: 'y2',
      name: 'x coord dist.',
      marker: {color: colorX}
    }, {
      type: 'histogram',
      x: y,
      xaxis: 'x3',
      yaxis: 'y3',
      name: 'y coord dist.',
      marker: {color: colorY}
    }], {
      title: 'Lasso around the scatter points to see sub-distributions',
      dragmode: 'lasso',
      xaxis: {
        zeroline: false,
      },
      yaxis: {
        domain: [0.55, 1],
      },
      xaxis2: {
        domain: [0, 0.45],
        anchor: 'y2',
      },
      yaxis2: {
        domain: [0, 0.45],
        anchor: 'x2'
      },
      xaxis3: {
        domain: [0.55, 1],
        anchor: 'y3'
      },
      yaxis3: {
        domain: [0, 0.45],
        anchor: 'x3'
      }
    });

    graphDiv.on('plotly_selected', function(eventData) {
      var x = [];
      var y = [];
      
      var colors = [];
      for(var i = 0; i < N; i++) colors.push(color1Light);
      
      eventData.points.forEach(function(pt) {
        x.push(pt.x);
        y.push(pt.y);
        colors[pt.pointNumber] = color1;
      });
      
      Plotly.restyle(graphDiv, {
        x: [x, y],
        xbins: {}
      }, [1, 2]);
      
      Plotly.restyle(graphDiv, 'marker.color', [colors], [0]);
    });

    graphDiv.on('plotly_deselect', function() {
      console.log('deselect');  
    });
      }
    }
