import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class ShadowMaskStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    padding = 0;

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
        this.addMask();
        this.createFilter(this.filter);
    }

    public createFilter(filter) {
        filter
            .attr('height', '200%')
            .attr('width', '200%')
            .attr('x', '-100%')
            .attr('y', '-50%');

        filter
            .append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', '3')
            .attr('result', 'blur');

        filter
            .append('feOffset')
            .attr('in', 'blur')
            .attr('dx', '2.5')
            .attr('dy', '2.5');
    }

    public render(words) {
        this.drawWordsIn(words, '#wwwmask', w => this.colorWhite(w));

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            this.setFilter(w, 'wwwfilter');
        });
    }
}
