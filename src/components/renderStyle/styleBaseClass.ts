import { ConfigurationService } from '../../services/configuration.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StyleBaseClass {
    constructor(public configurationService: ConfigurationService) { }

    protected svg: any;
    protected w: number;
    protected h: number;
    protected filter: any;
    protected glowfilter: any;
    protected defs: any;
    protected masked = true;

    readonly  strokeStyleDefault = 'DEFAULT';
    readonly  strokeStyleRandom = 'RANDOM';
    readonly strokeStyleNone = 'UNDEFINED';

    strokeStyle: string = this.strokeStyleNone;
    strokeStyleEnabled = false;
    readonly strokeMinWidth = 1;
    readonly strokeScale = 20;
    readonly strokeDefaultColor = 'white';
    readonly strokeOpacity = 1;

    protected initialise(svg: any, w: number, h: number) {
        this.svg = svg;
        this.h = h;
        this.w = w;

        this.defs = this.svg.append('defs');
        this.defs.attr('id', 'wwwdefs');

        this.svg.append('g').attr('id', 'wwwwords');
        this.svg.append('g').attr('id', 'wwwwords2');

        this.filter = this.defs.append('filter').attr('id', 'wwwfilter');
        this.filter = this.defs.append('filter').attr('id', 'wwwfilter2');
        this.glowfilter = this.defs.append('filter').attr('id', 'wwwglowfilter');

        this.createGlowFilter();
    }

    protected addMask() {
        this.defs.append('mask').attr('id', 'wwwmask');
        this.svg.attr('mask', 'url(#wwwmask)');
    }

    protected colorWhite(word) {
        word.style('fill', 'white');
    }

    protected colorBlack(word) {
        word.style('fill', 'black');
    }

    protected colorHsl(word, d) {
        const hsl = 'hsl(' + Math.floor(d.color * 360) + ',' + this.configurationService.saturation + '%,' + this.configurationService.lightness + '%)';
        word.style('fill', hsl);
    }

    protected getColorHsl(d) {
        const hsl = 'hsl(' + Math.floor(d.color * 360) + ',' + this.configurationService.saturation + '%,' + this.configurationService.lightness + '%)';
        return hsl;
    }

    protected getRandomColorHsl() {
        const hsl = 'hsl(' + Math.floor(Math.random() * 360) + ',' + this.configurationService.saturation + '%,' + this.configurationService.lightness + '%)';
        return hsl;
    }

    protected setFilter(word, filterName) {
        word.attr('filter', 'url(#' + filterName + ')');
    }

    protected setFill(word, fillName) {
        word.attr('fill', 'url(#' + fillName + ')');
    }

    protected drawWordsIn(words: any[], selector: string, wordCallback: Function) {
        const filter = this.svg.select(selector);
        words.forEach(d => {
            const word = filter.append('text');

            wordCallback(word, d);

            word.style('font-size', () => d.size + 'px')
                .style('font-family', () => (d.fontFace = this.configurationService.fontFace))
                .attr('text-anchor', 'middle')
                .attr('transform', () => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                .text(() => {
                    return d.text;
                });
        });
    }

    protected createGlowFilter() {
        this.glowfilter
            .attr('x', '-30%')
            .attr('y', '-30%')
            .attr('width', '160%')
            .attr('height', '160%');

        this.glowfilter
            .append('feGaussianBlur')
            .attr('stdDeviation', '10 10')
            .attr('result', 'stage1Filter');

        const glowCount = 2;

        const feMerge = this.glowfilter.append('feMerge');
        for (let i = 0; i < glowCount; i++) {
            feMerge.append('feMergeNode').attr('in', 'stage1Filter');
            feMerge.append('feMergeNode').attr('in', 'stage1Filter');
        }
    }

    protected applyStrokeStyle(word, d, divider) {
        if (this.strokeStyle === this.strokeStyleNone || !this.strokeStyleEnabled) {
            return;
        }

        let colour = this.strokeDefaultColor;

        switch (this.strokeStyle) {
            case this.strokeStyleDefault:
                colour = 'white';
                break;
            case this.strokeStyleRandom:
                colour = this.getRandomColorHsl();
                break;
            default:
                colour = this.strokeStyle;
                break;
        }

        word.style('stroke', () => colour)
            .style('stroke-opacity', () => this.strokeOpacity)
            .style('stroke-linecap', 'round')
            .style('stroke-linejoin', 'round')
            .style('stroke-width', () => {
                let scale = ~~(d.size / this.strokeScale / divider);
                scale = scale < this.strokeMinWidth ? this.strokeMinWidth : scale;
                return scale + 'px';
            });
    }
}
