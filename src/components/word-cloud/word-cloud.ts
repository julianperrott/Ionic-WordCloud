import { Component, HostListener, Injector, Input, OnChanges } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationService, Shape } from '../../services/configuration.service';
import { WordsToCountService } from '../../services/wordsToCountService';
import { D3CloudFacade } from './d3CloudFacade';
import { StyleFactory } from '../renderStyle/styleFactory';
import { IStyle } from '../renderStyle/iStyle';
import { Event } from '../../services/event';

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

        events.subscribe(Event.CONFIG_CHANGED, v => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.forceRedraw();
        });

        events.subscribe(Event.STYLE_CHANGED, v => {
            this.buildSVG();
            this.createStyle();
            this.style.render(this.data.filter(c => c.x !== undefined && c.y !== undefined));
        });

        events.subscribe(Event.SHAPE_BACKGROUND_COLOR, color => {
            this.removeShapeBackground();
            const shape = this.createShape();
            this.configurationService.shapeBackgroundColor = color;
            this.renderer.redrawBackground(shape);
        });

        events.subscribe(Event.PROGRESS_UPDATE, p => {
            this.progress = p;
        });

        events.subscribe(Event.REDRAW_WORDCLOUD, description => {
            console.log(description);
            this.ngOnChanges();
        });

        events.subscribe(Event.SHAPE_BACKGROUND_RENDER, svg => {
            document.getElementById('backgroundSvg').innerHTML = svg;

            /*
            let element = document.getElementById('backgroundSvg');
            while (element) {
                element.remove();
                element = document.getElementById('backgroundSvg');
            }
*/
        });

        events.subscribe(Event.SHAPE_BACKGROUND_VISIBILITY, visibility => {
            document.getElementById('backgroundCanvas').classList.remove('behind');
            document.getElementById('backgroundCanvas').classList.remove('notShown');
            document.getElementById('backgroundCanvas').classList.add(visibility ? 'behind' : 'notShown');

            document.getElementById('backgroundSvg').classList.remove('behind');
            document.getElementById('backgroundSvg').classList.remove('notShown');
            document.getElementById('backgroundSvg').classList.add(visibility ? 'behind' : 'notShown');
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

        this.data = counts
            .map(item => {
                return {
                    text: item.text,
                    size: item.size * scale * (shortestAxis / 70) * (this.configurationService.fontScale / 100),
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
                        size: scale * (shortestAxis / this.configurationService.fontScale),
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

        this.data.forEach((ww, i) => (ww.i = i)); // add index

        this.renderer.populate(this.w, this.h, this.style.padding, this.data, () => this.createShape(), words => this.style.render(words));

        this.hideSplashScreen();
    }

    private createStyle() {
        this.style = this.styleFactory.getStyle();

        if (!this.configurationService.strokeStyle) {
            this.configurationService.setStrokeStyle(this.style);
        }

        this.style.strokeStyle = this.configurationService.strokeStyle;

        this.style.initialise(this.svg, this.w, this.h);

        if (this.configurationService.wordColors) {
            this.configurationService.wordColors.forEach((c, i) => this.configurationService.setFloodColor('color' + (i + 1), c.color));
        }
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
            document.getElementById('foregroundSvg').innerHTML = "";
        }else{
            this.w = this.width - this.margin.left - this.margin.right;
            this.h = this.height - this.margin.top - this.margin.bottom;
    
            const s = D3.select('div.word-cloud')
                .append('svg')
                .attr('xmlns', 'http://www.w3.org/2000/svg')
                .attr('width', this.w)
                .attr('height', this.h);
    
            s.append('g').attr('id', 'backgroundSvg');    

            this.svg = s.append('g').attr('id', 'foregroundSvg').attr('transform', 'translate(' + ~~(this.w / 2) + ',' + ~~(this.h / 2) + ')');
        }
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

        let filter = '';
        if (this.configurationService.shapeStyleKey && this.configurationService.shapeStyleKey !== 'None') {
            const style = this.styleFactory.getStyleByKey(this.configurationService.shapeStyleKey);
            filter = style.getStyleHtml();
            this.configurationService.shapeColors.forEach((c, i) => (filter = filter.replace(style.defaultColours[i], c.color)));
        }

        const shape = this.configurationService.getShape(filter);

        // create a new image canvas
        if (shape.url.length > 0) {
            shape.canvas = document.createElement('canvas');
            shape.canvas.className = this.configurationService.shapeStyleKey !== 'None' ? 'behind' : 'notShown';
            shape.canvas.id = 'backgroundCanvas';
            document.getElementById('word-cloud').appendChild(shape.canvas);
        }

        return shape;
    }
}
