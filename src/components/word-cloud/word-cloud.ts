import { Component, Input, OnInit } from '@angular/core';

import * as D3 from 'd3';

declare var d3: any;

@Component({
    selector: 'word-cloud',
    template: '<div class="word-cloud"></div>'
})
export class WordCloudComponent implements OnInit {
    @Input() wordData;
    data = [];

    private svg; // SVG in which we will print our chart
    private margin: {
        // Space between the svg borders and the actual chart graphic
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    private width: number; // Component width
    private height: number; // Component height
    tempData = [];

    ngOnInit() {
        const ignoreWords = [
            'the',
            'to',
            'a',
            'it',
            'and',
            'on',
            'so',
            'be',
            'of',
            'is',
            'i'
        ];

        const counts = this.wordData.data
            .split(/[:;() ,.]+/)
            .map(function(word) {
                return word.toLowerCase();
            })
            .filter(function(word) {
                return ignoreWords.indexOf(word) === -1 && word.length > 2;
            })
            .reduce(function(count, word) {
                count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
                return count;
            }, {});

        this.data = Object.keys(counts)
            .map(function(key) {
                return { text: key, size: counts[key] * 20 };
            })
            .sort(function(a, b) {
                return a.size === b.size ? 0 : a.size > b.size ? -1 : 1;
            })
            .filter(function(value, i) {
                return i < 250;
            });

        this.setup();
        this.buildSVG();
        this.populate();
    }

    private setup() {
        this.margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };
        this.width = window.innerWidth - this.margin.left - this.margin.right;
        this.height = this.width * 0.75 - this.margin.top - this.margin.bottom;
    }

    private buildSVG() {
        this.svg = D3.select('div.word-cloud')
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr(
                'transform',
                'translate(' +
                    ~~(this.width / 2) +
                    ',' +
                    ~~(this.height / 2) +
                    ')'
            );
    }

    private populate() {
        const fontFace: string =
            this.wordData.settings.fontFace == null
                ? 'Impact'
                : this.wordData.settings.fontFace;
        const fontWeight: string =
            this.wordData.settings.fontWeight == null
                ? 'normal'
                : this.wordData.settings.fontWeight;
        const spiralType: string =
            this.wordData.settings.spiral == null
                ? 'archimedean'
                : this.wordData.settings.spiral;

        d3.layout
            .cloud()
            .size([this.width, this.height])
            .words(this.data)
            .padding(2)
            .rotate(() => (~~(Math.random() * 6) - 3) * 30)
            .font(fontFace)
            .fontWeight(fontWeight)
            .fontSize(d => d.size)
            .spiral(spiralType)
            .on('end', () => {
                this.drawWordCloud(this.data);
            })
            .start();
    }

    private drawWordCloud(words) {
        this.svg
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('fill', (d, i) => {
                return 'hsl(' + Math.random() * 360 + ',100%,50%)';
            })
            .attr('text-anchor', 'middle')
            .attr(
                'transform',
                d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
            )
            .attr('class', 'word-cloud')
            .text(d => {
                return d.text;
            });
    }
}
