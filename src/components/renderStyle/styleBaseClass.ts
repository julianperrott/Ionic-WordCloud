import { ConfigurationService } from '../../services/configuration.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StyleBaseClass {
    constructor(public configurationService: ConfigurationService) {}

    protected svg: any;
    protected w: number;
    protected h: number;
    protected filter: any;
    protected defs: any;
    protected masked = true;

    public strokeStyleDefault = 'DEFAULT';
    public strokeStyleRandom = 'RANDOM';
    public strokeStyleNone = 'UNDEFINED';

    strokeStyle: string = this.strokeStyleNone;
    strokeStyleEnabled = false;

    protected initialise(svg: any, w: number, h: number) {
        this.svg = svg;
        this.h = h;
        this.w = w;

        this.defs = this.svg.append('defs');
        this.defs.attr('id', 'wwwdefs');

        this.svg.append('g').attr('id', 'wwwwords');
        this.svg.append('g').attr('id', 'wwwwords2');

        this.filter = this.defs.append('filter').attr('id', 'wwwfilter');
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
        const settings = this.configurationService.settings;
        const hsl = 'hsl(' + Math.floor(d.color * 360) + ',100%,' + settings.lightnessGlow + ')';
        word.style('fill', hsl);
    }

    protected getColorHsl(d) {
        const settings = this.configurationService.settings;
        const hsl = 'hsl(' + Math.floor(d.color * 360) + ',100%,' + settings.lightnessGlow + ')';
        return hsl;
    }

    protected setFilter(word, filterName) {
        word.attr('filter', 'url(#' + filterName + ')');
    }

    protected setFill(word, fillName) {
        word.attr('fill', 'url(#' + fillName + ')');
    }

    protected drawWordsIn(words: any[], selector: string, wordCallback: Function) {
        const settings = this.configurationService.settings;

        const filter = this.svg.select(selector);
        words.forEach(d => {
            const word = filter.append('text');

            wordCallback(word, d);

            word.style('font-size', () => d.size + 'px')
                .style('font-family', () => (d.fontFace = settings.fontFace))
                .attr('text-anchor', 'middle')
                .attr('transform', () => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                .text(() => {
                    return d.text;
                });
        });
    }

    protected applyStrokeStyle(word, d, divider) {
        if (this.strokeStyle === this.strokeStyleNone || !this.strokeStyleEnabled) {
            return;
        }

        const settings = this.configurationService.settings;

        let colour = settings.strokeColour;

        switch (this.strokeStyle) {
            case this.strokeStyleDefault:
                colour = settings.strokeColour;
                break;
            case this.strokeStyleRandom:
                colour = this.getColorHsl(d);
                break;
            default:
                colour = this.strokeStyle;
                break;
        }

        word.style('stroke', () => colour)
            .style('stroke-opacity', () => settings.strokeOpacity)
            .style('stroke-linecap', 'round')
            .style('stroke-linejoin', 'round')
            .style('stroke-width', () => {
                let scale = ~~(d.size / settings.strokeScale / divider);
                scale = scale < settings.strokeMinWidth ? settings.strokeMinWidth : scale;
                return scale + 'px';
            });
    }
}
