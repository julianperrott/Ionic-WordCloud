import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';
import { IStyle } from '../iStyle';

@Injectable()
export class DropShadowStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    padding = 2;

    defaultColours = [];

    strokeStyle = this.strokeStyleDefault;
    strokeStyleEnabled = true;

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
        this.createFilter();
    }

    public getStyleHtml(): string{
        return '<feGaussianBlur stdDeviation="2 2"></feGaussianBlur><feOffset in="blur" dx="6" dy="6"></feOffset>';
    }

    public createFilter() {
        this.filter
            .attr('x', '-30%')
            .attr('y', '-30%')
            .attr('width', '160%')
            .attr('height', '160%');
        this.filter.append('feGaussianBlur').attr('stdDeviation', '2 2');

        this.filter
            .append('feOffset')
            .attr('in', 'blur')
            .attr('dx', '6')
            .attr('dy', '6');
    }

    public render(words) {
        const settings = this.configurationService.settings;

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorBlack(w);
            this.setFilter(w, 'wwwfilter');
        });

        this.drawWordsIn(words, '#wwwwords2', (word, d) => {
            this.colorHsl(word, d);
            this.applyStrokeStyle(word, d, 2);
        });
    }
}
