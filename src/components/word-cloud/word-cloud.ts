import { Component, Input, OnChanges } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationService } from '../../services/configuration.service';
import { NgZone } from '@angular/core';

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
        private toastCtrl: ToastController,
        private zone: NgZone
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

    countWords(ignoreWords: string[], minWordLength: number): any {
        const counts = this.wordData
            .split(/[&\r\n'’"“”:;() ,.]+/)
            .map(word => word.toLowerCase().trim())
            .filter(
                word =>
                    ignoreWords.indexOf(word) === -1 &&
                    word.length >= minWordLength
            )
            .reduce((count, word) => {
                count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
                return count;
            }, {});

        const items = Object.keys(counts)
            .map(key => {
                return {
                    text: key,
                    size: counts[key]
                };
            })
            .sort((a, b) => (a.size === b.size ? 0 : a.size > b.size ? -1 : 1));

        if (ignoreWords.length > 0) {
            this.toastCtrl
                .create({
                    message: 'Distinct words found: ' + items.length,
                    duration: 3000,
                    position: 'bottom'
                })
                .present();
        }

        if (this.configurationService.countStyle === 'BANDING') {
            const wordSizes = [24, 18, 15, 10, 8, 6, 4, 3, 2];
            const capacity = [1, 2, 4, 8, 16, 32, 64, 128];

            let itemsInBand = 0;
            let band = 0;
            const scale = 256 / items.length;
            console.log('scale: ' + scale + ', items: ' + items.length);

            items.forEach(e => {
                if (itemsInBand >= capacity[band]) {
                    itemsInBand = 0;
                    band++;
                }
                e.size = wordSizes[band];
                itemsInBand += scale;

                // console.log(e.text + ' = ' + e.size);
            });
        }

        return items;
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

        const ignoreWords = this.configurationService.ignoreWords.split(',');

        const counts = this.countWords(ignoreWords, 3);

        const scale = 12 / Math.max.apply(0, counts.map(key => key.size));

        const shortestAxis =
            this.width > this.height ? this.height : this.width;

        console.log(this.configurationService.settings.fontScale / 100);
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

        this.data.forEach(d => (d.drawn = false));

        let cache = [];

        if (this.data.length === 0) {
            this.configurationService.setBusy(false);
        }

        this.progress = 0;

        const startTime = performance.now();

        this.d3cloud
            .size([this.width, this.height])
            .words(this.data)

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
                    if (newProgress > this.progress) {
                        this.zone.run(() => {
                            this.progress = newProgress;
                        });
                    }

                    if (c) {
                        // console.log('word: ' + c.text + ',' + c.x + ',' + c.y);
                        if (c.x !== undefined && c.y !== undefined) {
                            cache.push(c);
                        }
                        if (cache.length === 20) {
                            this.zone.run(() => {
                                this.drawWordCloud(cache);
                                cache = [];
                            });
                        }
                    }

                    c.drawn = true;
                }
            })
            .on('end', () => {
                if (!this.d3cloud.cancelled) {
                    console.log(
                        'Duration: ' + (performance.now() - startTime) / 1000
                    );
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
            .start(this.configurationService.shape);
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
