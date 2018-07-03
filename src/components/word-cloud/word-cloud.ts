import { Component, Input, OnChanges } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationService } from '../../services/configuration.service';
import { NgZone } from '@angular/core';
import { WordsToCountService } from '../../services/wordsToCountService';

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
    d3cloud: any;
    w;
    h;

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
    progress = 0;

    constructor(
        private configurationService: ConfigurationService,
        private splashScreen: SplashScreen,
        platform: Platform,
        private zone: NgZone,
        private wordsToCountService: WordsToCountService
    ) {
        platform.ready().then(() => {
            this.platformReady = true;
            if (this.data.length > 0) {
                this.forceRedraw();
            }
        });

        configurationService.configurationChanged$.subscribe(v => {
            this.forceRedraw();
        });

        configurationService.fontChanged$.subscribe(v => {
            D3.select('div.word-cloud')
                .select('svg')
                .select('g')
                .selectAll('text')
                .remove();
            this.drawWordCloud(
                this.data.filter(c => c.x !== undefined && c.y !== undefined)
            );
        });

        this.d3cloud = d3.layout.cloud();
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

    ngOnChanges() {
        if (this.lastdata === this.wordData) {
            this.configurationService.setBusy(false);
            return;
        }

        if (!this.platformReady) {
            return;
        }

        if (this.d3cloud.busy) {
            this.d3cloud.abort();
            console.log('d3cloud is busy');
            return;
        }

        console.log('drawCloud()');
        this.d3cloud.busy = true;
        this.configurationService.setBusy(true);

        this.setup();
        this.buildSVG();

        this.lastdata = this.wordData;

        const counts = this.wordsToCountService.count(this.wordData);

        const scale = 12 / Math.max.apply(0, counts.map(key => key.size));

        const shortestAxis =
            this.width > this.height ? this.height : this.width;

        // console.log(this.configurationService.settings.fontScale / 100);
        this.data = counts
            .map(item => {
                return {
                    text: item.text,
                    size:
                        item.size *
                        scale *
                        (shortestAxis / 70) *
                        (this.configurationService.settings.fontScale / 100),
                    color: Math.random()
                };
            })
            .sort(function(a, b) {
                return a.size === b.size ? 0 : a.size > b.size ? -1 : 1;
            });

        // pad words
        while (this.data.length < 150) {
            this.data.forEach(d => {
                if (this.data.length < 150) {
                    this.data.push({
                        isPadding: true,
                        text: d.text,
                        size:
                            1 *
                            scale *
                            (shortestAxis /
                                this.configurationService.settings.fontScale),
                        color: d.color
                    });
                }
            });
        }

        this.words = this.data
            .map(function(v) {
                return v.text;
            })
            .join(',');

        this.populate();

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

        this.w = this.width - this.margin.left - this.margin.right;
        this.h = this.height - this.margin.top - this.margin.bottom;

        this.svg = D3.select('div.word-cloud')
            .append('svg')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('width', this.w)
            .attr('height',this.h )
            .append('g')
            .attr(
                'transform',
                'translate(' +
                    ~~(this.w / 2) +
                    ',' +
                    ~~(this.h / 2) +
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

        this.data.forEach(d => (d.drawn = false));

        let cache = [];

        if (this.data.length === 0) {
            this.configurationService.setBusy(false);
        }

        this.progress = 0;

        let startTime = performance.now();


        const lastCanvas = document.getElementById('backgroundCanvas');
        if (lastCanvas) {
          lastCanvas.remove();
        }

        var shape = this.configurationService.getShape();

        // create a new image canvas
        if (shape.url.length>0 && shape.showBackground){
            shape.canvas = document.createElement('canvas');
            shape.canvas.className = 'behind';
            shape.canvas.id = 'backgroundCanvas';
            document.getElementById('word-cloud').appendChild(shape.canvas);
        }

        this.d3cloud
            .size([this.w, this.h])
            .words(this.data)
            .shape(()=>shape)
            .padding(2)
            .rotate(() => (~~(Math.random() * 6) - 3) * 30)
            .font(this.configurationService.settings.fontFace)
            .fontWeight(fontWeight)
            .fontSize(d => d.size)
            .spiral(spiralType)
            .on('word', (c, i) => {
                if (!this.d3cloud.cancelled) {
                    const newProgress = Math.floor(
                        (i * 100) / this.data.length
                    );

                    if (c) {
                        if (c.x !== undefined && c.y !== undefined) {
                            cache.push(c);
                        }
                    }

                    const refreshSeconds = 1;
                    const refreshNow =
                        performance.now() - startTime > refreshSeconds * 1000 ||
                        newProgress - this.progress > 5;

                    // refresh if more than n seconds have elapsed
                    if (refreshNow) {
                        const cacheCopy = cache;
                        cache = [];

                        this.zone.run(() => {
                            this.progress = newProgress;
                            if (cacheCopy.length > 0) {
                                this.drawWordCloud(cacheCopy);
                            }
                        });

                        startTime = performance.now();
                    }

                    c.drawn = true;
                }
            })
            .on('end', () => {
                if (!this.d3cloud.cancelled) {
                    // console.log('Duration: ' + (performance.now() - startTime) / 1000);
                    this.progress = 100;

                    const todo = this.data.filter(
                        c =>
                            (c.drawn === false || c.drawn === undefined) &&
                            c.x !== undefined &&
                            c.y !== undefined
                    );

                    console.log('End todo: ' + todo.length);

                    this.drawWordCloud(todo);
                    this.drawWordCloud(cache);
                    cache = [];

                    setTimeout(() => {
                        this.configurationService.setBusy(false);
                    }, 100);
                } else {
                    this.ngOnChanges();
                }
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
