import { Component, Input, OnInit } from '@angular/core';

import * as D3 from 'd3';

declare var d3: any;

@Component({
  selector: 'word-cloud',
  template: '<div class="word-cloud">{{text}}</div>'
})
export class WordCloudComponent implements OnInit {

  text: string; // old

  @Input() wordData;
  data = [];

  private svg;               // SVG in which we will print our chart
  private margin: {          // Space between the svg borders and the actual chart graphic
    top: number,
    right: number,
    bottom: number,
    left: number
  };
  private width: number;      // Component width
  private height: number;     // Component height
  private fillScale;          // D3 scale for text color
  tempData = [];


  constructor() {
    console.log('Hello WordCloudComponent Component');
    this.text = 'Hello World2';
  }

  ngOnInit() {
    let cls = this;

    var ignoreWords = ['the','to','a','it','and','on','so','be','of','is','i'];

    var counts = this.wordData.data.split(/[ ,.]+/)
      .map(function(word){ return word.toLowerCase()})
      .filter(function(word) { return ignoreWords.indexOf(word)===-1 && word.length>2;})
      .reduce(function(count, word) {
        count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
        return count;
      }, {});

      this.data = Object.keys(counts)
      .filter(function(key){ return counts[key] >1 ;})
      .map(function(key){
        return {text: key, size: counts[key]*20};
      });

    this.setup();
    this.buildSVG();
    this.populate();
  }

   private getRandom() {
    let cls = this;
    let size = 10 + Math.random() * 100;
    if(size > 70 && this.tempData.length <= 10) {
      this.tempData.push(size);
    }
    
    if(this.tempData.length > 10 && size > 14) {
      return 12;
    }

    return size;
  }

  private setup() {
    this.margin = {
      top   : 10,
      right : 10,
      bottom: 10,
      left  : 10
    };
    this.width = window.innerWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.75 - this.margin.top - this.margin.bottom;

    let minFontSize: number = (this.wordData.settings.minFontSize == null) ? 18 : this.wordData.settings.minFontSize;
    let maxFontSize: number = (this.wordData.settings.maxFontSize == null) ? 96 : this.wordData.settings.maxFontSize;
    this.fillScale = D3.scaleOrdinal(D3.schemeCategory20);
  }

  private buildSVG() {
    this.svg = D3.select("div.word-cloud")
                    .append('svg')
                    .attr('width', this.width + this.margin.left + this.margin.right)
                    .attr('height', this.height + this.margin.top + this.margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + ~~(this.width / 2) + ',' + ~~(this.height / 2) + ')');
  }

  private populate() {
    let fontFace: string = (this.wordData.settings.fontFace == null) ? 'Impact' : this.wordData.settings.fontFace;
    let fontWeight: string = (this.wordData.settings.fontWeight == null) ? 'normal' : this.wordData.settings.fontWeight;
    let spiralType: string = (this.wordData.settings.spiral == null) ? 'archimedean' : this.wordData.settings.spiral;

    d3.layout.cloud()
      .size([this.width, this.height])
      .words(this.data)
      .padding(5)
      .rotate(() => (~~(Math.random() * 6) -3) * 30)
      .font(fontFace)
      .fontWeight(fontWeight)
      .fontSize(d => (d.size))
      .spiral(spiralType)
      .on('end', () => {
        this.drawWordCloud(this.data);
      })
      .start();
  }

  private drawWordCloud(words) {

    var color = D3.scaleLinear()
      .domain([-1, 0, 1])
      .range([0,1,2]);



    this.svg
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => d.size + 'px')
        .style('fill', (d, i) => {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr('text-anchor', 'middle')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
        .attr('class', 'word-cloud')
        .text(d => {
          return d.text;
        });
  }
}
