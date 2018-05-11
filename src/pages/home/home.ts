import { Component } from '@angular/core';

import * as d3 from 'd3-selection';
import { Data } from './data';

import * as unfluff from 'unfluff';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    data = Data;

    ionViewDidLoad() {
        this.createCircles();

        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const requesturl = 'http://www.bbc.co.uk/news/uk-44070304';
        fetch(proxyurl + requesturl)
            .then(response => response.text())
            .then(text => {
                console.log(text);

                this.data ={
                    data: unfluff(text, 'en').text,
                    settings: {
                        minFontSize: 10,
                        maxFontSize: 300,
                        fontFace: 'Impact',
                        spiralType : 'archimedean',
                        fontWeight: 'bolder',
                    }
            }});
    }

    createCircles(): void {
        const jsonCircles = [
            { x_axis: 30, y_axis: 30, radius: 20, color: 'green' },
            { x_axis: 70, y_axis: 70, radius: 20, color: 'purple' },
            { x_axis: 110, y_axis: 100, radius: 20, color: 'red' }
        ];

        const svgContainer = d3
            .select('#circles')
            .append('svg')
            .attr('width', 300)
            .attr('height', 200)
            .style('border', '1px solid black');

        const circles = svgContainer
            .selectAll('circle')
            .data(jsonCircles)
            .enter()
            .append('circle');

        circles
            .attr('cx', d => d.x_axis)
            .attr('cy', d => d.y_axis)
            .attr('r', d => d.radius)
            .style('fill', d => d.color);
    }
}
