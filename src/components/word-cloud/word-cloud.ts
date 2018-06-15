import { Component, Input, OnChanges } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationService } from '../../services/configuration.service';
import { Events } from 'ionic-angular';

import * as D3 from 'd3';

declare var d3: any;

@Component({
    selector: 'word-cloud',
    templateUrl: 'word-cloud.html'
})
export class WordCloudComponent implements OnChanges {
    @Input() wordData;
    lastdata = '';
    data = [];
    words = '';
    backgroundColor = '#00FF00';

    private svg; // SVG in which we will print our cloud on
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
    platformReady = false;

    constructor(
        private configurationService: ConfigurationService,
        private splashScreen: SplashScreen,
        platform: Platform,
        public events: Events
    ) {
        platform.ready().then(() => {
            this.platformReady = true;
            this.forceRedraw();
        });

        configurationService.configurationChanged$.subscribe(v => {
            this.forceRedraw();
        });

        this.events.subscribe('bgColorChanged', (color) => {
            this.backgroundColor = color;
        });
    }

    forceRedraw() {
        this.lastdata = '';
        this.ngOnChanges();
    }

    downloadAsSvg() {
        const link = document.createElement('a');
        link.href =
            'data:application/octet-stream;base64,' +
            btoa(D3.select('div.word-cloud').html());
        link.download = 'viz.svg';
        document.body.appendChild(link);
        link.click();
    }

    countWords(ignoreWords: string[], minWordLength: number): any {
        return this.wordData
            .split(/[&\r\n'’"“”:;() ,.]+/)
            .map(function(word) {
                return word.toLowerCase().trim();
            })
            .filter(function(word) {
                return (
                    ignoreWords.indexOf(word) === -1 &&
                    word.length >= minWordLength
                );
            })
            .reduce(function(count, word) {
                count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
                return count;
            }, {});
    }

    ngOnChanges() {
        if (this.lastdata === this.wordData) {
            this.configurationService.setBusy(false);
            return;
        }

        if (!this.platformReady) {
            return;
        }

        this.configurationService.setBusy(true);

        this.setup();
        this.buildSVG();

        this.lastdata = this.wordData;

        let ignoreWords = this.configurationService.ignoreWords.split(',');

        let counts = this.countWords(ignoreWords, 3);

        if (Object.keys(counts).length < 50) {
            ignoreWords = [];
            counts = this.countWords(ignoreWords, 2);
        }

        const scale =
            15 / Math.max.apply(0, Object.keys(counts).map(key => counts[key]));

        const shortestAxis =
            this.width > this.height ? this.height : this.width;

        this.data = Object.keys(counts)
            .map(key => {
                return {
                    text: key,
                    size:
                        counts[key] *
                        scale *
                        (shortestAxis /
                            this.configurationService.settings.fontScale),
                    color: Math.random()
                };
            })
            .sort(function(a, b) {
                return a.size === b.size ? 0 : a.size > b.size ? -1 : 1;
            });

        /*
        for (let i = 0; i < 10; i++) {
            this.data.forEach(d => {
                this.data.push({
                    isPadding: true,
                    text: '' + i + d.text,
                    size:
                        1 *
                        scale *
                        (shortestAxis /
                            this.configurationService.settings.fontScale),
                    color: d.color
                });
            });
        }
        */

        this.words = this.data
            .map(function(v) {
                return v.text;
            })
            .join(',');

        this.populate();

        this.configurationService.setBusy(false);

        this.hideSplashScreen();
    }

    private hideSplashScreen() {
        if (this.splashScreen) {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 100);
        }
    }

    private setup() {
        this.margin = {
            top: 10,
            right: 0,
            bottom: 20,
            left: 10
        };

        this.width = window.innerWidth - this.margin.left - this.margin.right;
        this.height = window.innerHeight - this.margin.top - this.margin.bottom;
    }

    private buildSVG() {
        if (this.svg) {
            D3.select('div.word-cloud')
                .select('svg')
                .remove();
        }

        this.svg = D3.select('div.word-cloud')
            .append('svg')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('width', this.width - this.margin.left - this.margin.right)
            .attr('height', this.height - this.margin.top - this.margin.bottom)
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
        const fontWeight: string =
            this.configurationService.settings.fontWeight == null
                ? 'normal'
                : this.configurationService.settings.fontWeight;
        const spiralType: string =
            this.configurationService.settings.spiralType == null
                ? 'archimedean'
                : this.configurationService.settings.spiralType;

        this.addSVGFilter();

        d3.layout
            .cloud()
            .size([this.width, this.height])
            .words(this.data)

            .padding(2)
            .rotate(() => (~~(Math.random() * 6) - 3) * 30)
            .font(this.configurationService.settings.fontFace)
            .fontWeight(fontWeight)
            .fontSize(d => d.size)
            .spiral(spiralType)
            .on('word', c => {
                this.drawWordCloud(
                    [c].filter(d => d.x !== undefined && d.y !== undefined)
                );
            })
            .start();
    }

    private addSVGFilter() {
        const settings = this.configurationService.settings;

        const defs = this.svg.append('defs');

        const filter = defs
            .append('filter')
            .attr('id', 'glow')
            .attr('x', '-30%')
            .attr('y', '-30%')
            .attr('width', '160%')
            .attr('height', '160%');
        filter
            .append('feGaussianBlur')
            .attr('stdDeviation', '10 10')
            .attr('result', 'glow');

        const feMerge = filter.append('feMerge'); // glow count
        for (let i = 0; i < settings.glowCount; i++) {
            feMerge.append('feMergeNode').attr('in', 'glow');
            feMerge.append('feMergeNode').attr('in', 'glow');
        }
    }

    private drawWordCloud(words) {
        const settings = this.configurationService.settings;

        const enter = this.svg
            .selectAll('g')
            .data(words)
            .enter();

        enter
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('font-family', d => (d.fontFace = settings.fontFace))
            .style('fill', (d, i) => {
                return (
                    'hsl(' +
                    d.color * 360 +
                    ',100%,' +
                    settings.lightnessGlow +
                    ')'
                );
            })
            .attr('text-anchor', 'middle')
            .attr(
                'transform',
                d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
            )
            .attr('filter', 'url(#glow)')
            .text(d => {
                return d.text;
            });

        enter
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('stroke', d => settings.strokeColour) // stroke colour
            .style('stroke-opacity', d => settings.strokeOpacity) //  stroke opacity
            .style('stroke-width', d => {
                let scale = ~~(d.size / settings.strokeScale);
                scale =
                    scale < settings.strokeMinWidth
                        ? settings.strokeMinWidth
                        : scale;
                return scale + 'px';
            }) // stroke size divider + min width
            .style(
                'font-family',
                d => (d.fontFace = settings.fontFace) // font face
            )
            .style('fill', (d, i) => {
                return (
                    'hsl(' +
                    d.color * 360 +
                    ',100%, ' +
                    settings.lightness +
                    ')'
                );
            })
            .attr('text-anchor', 'middle')
            .attr(
                'transform',
                d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
            )
            .text(d => {
                return d.text;
            });
    }
}
