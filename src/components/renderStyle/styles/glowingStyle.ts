import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';
import { IStyle } from '../iStyle';

@Injectable()
export class GlowingStyle extends StyleBaseClass implements IStyle {
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

    public createFilter() {
        this.filter
            .attr('x', '-30%')
            .attr('y', '-30%')
            .attr('width', '160%')
            .attr('height', '160%');
        this.filter
            .append('feGaussianBlur')
            .attr('stdDeviation', '10 10')
            .attr('result', 'stage1Filter');

        const feMerge = this.filter.append('feMerge');
        for (let i = 0; i < this.configurationService.settings.glowCount; i++) {
            feMerge.append('feMergeNode').attr('in', 'stage1Filter');
            feMerge.append('feMergeNode').attr('in', 'stage1Filter');
        }
    }

    public render(words) {
        this.drawWordsIn(words, '#wwwwords', (word, d) => {
            this.colorHsl(word, d);
            this.setFilter(word, 'wwwfilter');
        });

        this.drawWordsIn(words, '#wwwwords2', (word, d) => {
            this.colorHsl(word, d);
            this.applyStrokeStyle(word, d, 1);
        });
    }
}
