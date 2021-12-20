import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { DHTSensorLogDatapoint, DhtSensorWrapper } from 'src/app/types/dht';
import * as ApexCharts from "apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dht-canvas-line-graph',
  templateUrl: './dht-canvas-line-graph.component.html',
  styleUrls: ['./dht-canvas-line-graph.component.scss']
})
export class DhtCanvasLineGraphComponent implements AfterViewInit{
  @ViewChild("chart") chart!: ElementRef<HTMLDivElement>;
  @Input("dhtSensor") dhtSensor: DhtSensorWrapper| null = null;

  public chartOptions: Partial<ChartOptions> | null = null;
  chartObject: ApexCharts | null = null;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Sensor Data",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      }
    }
  }

  ngAfterViewInit(): void {
    //console.log(this.dhtSensorValues);
    console.log(this.chart.nativeElement);
    this.chartObject = new ApexCharts(this.chart.nativeElement, this.chartOptions);
    this.dhtSensor?.dataUpdate.subscribe((result) => {
      console.log("UPDATED")
      console.log(this.chart);
      let temperatures: number[] = [];
      let humidities: number[] = [];
      result.logData.forEach((datapoint) => {
        temperatures.push(datapoint.temperature);
        humidities.push(datapoint.humidity);
      });
      this.chartObject?.render().then(() => {
        this.chartObject?.updateSeries([
          {
            name: "temperatures",
            data: temperatures
          },
          {
            name: "humidities",
            data: humidities
          }
        ])
      });
    })

  }
}
