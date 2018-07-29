import { Component, HostListener, Injector, Input, OnChanges } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationService, Shape } from '../../services/configuration.service';
import { WordsToCountService } from '../../services/wordsToCountService';
import { D3CloudFacade } from './d3CloudFacade';
import { StyleFactory } from '../renderStyle/styleFactory';

import * as D3 from 'd3';

@Component({
    selector: 'word-cloud',
    templateUrl: 'word-cloud.html'
})
export class WordCloudComponent implements OnChanges {
    @Input() wordData;
    lastdata = '';
    data = [];
    words = '';
    w;
    h;
    renderer: D3CloudFacade;
    style: IStyle;

    private svg; // SVG in which we will print our cloud on
    private margin: {
        // Space between the svg borders and the actual chart graphic
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    public width: number; // Component width
    public height: number; // Component height
    tempData = [];
    platformReady = false;
    progress = 0;

    constructor(
        private configurationService: ConfigurationService,
        private splashScreen: SplashScreen,
        platform: Platform,
        private wordsToCountService: WordsToCountService,
        events: Events,
        private injector: Injector,
        private styleFactory: StyleFactory
    ) {
        this.renderer = this.injector.get(D3CloudFacade);
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        platform.ready().then(() => {
            this.platformReady = true;
            if (this.data.length > 0) {
                this.forceRedraw();
            }
        });

        configurationService.configurationChanged$.subscribe(v => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.forceRedraw();
        });

        configurationService.styleChanged$.subscribe(v => {
            this.buildSVG();
            this.createStyle();
            this.style.render(this.data.filter(c => c.x !== undefined && c.y !== undefined));
        });

        events.subscribe('shapeBackgroundColour', color => {
            this.removeShapeBackground();
            const shape = this.createShape();
            shape.backgroundColour = color;
            this.renderer.redrawBackground(shape);
        });

        events.subscribe('progressUpdate', p => {
            this.progress = p;
        });

        events.subscribe('redrawWordCloud', description => {
            console.log(description);
            this.ngOnChanges();
        });

        events.subscribe('shapeBackgroundVisibility', visibility => {
            document.getElementById('backgroundCanvas').classList.remove('behind');
            document.getElementById('backgroundCanvas').classList.remove('notShown');
            document.getElementById('backgroundCanvas').classList.add(visibility ? 'behind' : 'notShown');
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    forceRedraw() {
        this.lastdata = '';
        this.ngOnChanges();
    }

    downloadAsSvg() {
        const link = document.createElement('a');
        link.href = 'data:application/octet-stream;base64,' + btoa(D3.select('div.word-cloud').html());
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

        if (this.renderer.isBusy()) {
            this.renderer.abort();
            console.log('d3cloud is busy');
            return;
        }

        console.log('drawCloud()');
        this.renderer.setBusy(true);
        this.configurationService.setBusy(true);

        this.setup();
        this.buildSVG();

        this.lastdata = this.wordData;

        const counts = this.wordsToCountService.count(this.wordData);

        const scale = 12 / Math.max.apply(0, counts.map(key => key.size));

        const shortestAxis = this.width > this.height ? this.height : this.width;

        // console.log(this.configurationService.settings.fontScale / 100);
        this.data = counts
            .map(item => {
                return {
                    text: item.text,
                    size: item.size * scale * (shortestAxis / 70) * (this.configurationService.settings.fontScale / 100),
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
                        size: 1 * scale * (shortestAxis / this.configurationService.settings.fontScale),
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

        this.removeShapeBackground();

        this.createStyle();

        this.renderer.populate(this.w, this.h, this.style.padding, this.data, () => this.createShape(), words => this.style.render(words));

        this.hideSplashScreen();
    }

    private createStyle() {
        this.style = this.styleFactory.getStyle();
        this.style.initialise(this.svg, this.w, this.h);
        this.configurationService.setFloodColor('color1', this.configurationService.color1);
        this.configurationService.setFloodColor('color2', this.configurationService.color2);
        this.configurationService.setFloodColor('color3', this.configurationService.color3);
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
            .attr('height', this.h)
            .append('g')
            .attr('transform', 'translate(' + ~~(this.w / 2) + ',' + ~~(this.h / 2) + ')');
    }

    private removeShapeBackground() {
        let lastCanvas = document.getElementById('backgroundCanvas');
        while (lastCanvas) {
            lastCanvas.remove();
            lastCanvas = document.getElementById('backgroundCanvas');
        }
    }

    private createShape(): Shape {
        this.removeShapeBackground();

        const shape = this.configurationService.getShape();

        // create a new image canvas
        if (shape.url.length > 0) {
            shape.canvas = document.createElement('canvas');
            shape.canvas.className = shape.showBackground ? 'behind' : 'notShown';
            // alert(shape.canvas.className);
            shape.canvas.id = 'backgroundCanvas';
            document.getElementById('word-cloud').appendChild(shape.canvas);
        }

        return shape;
    }
}
