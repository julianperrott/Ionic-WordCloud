import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { MaskStyleBaseClass } from './MaskStyleBaseClass';

@Injectable()
export class WaterMaskStyle extends MaskStyleBaseClass {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    padding = 0;
    drawWordsWithoutFilter = false;

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
        this.addMask();
        this.innerShadowFilter(this.filter);
    }

    public innerShadowFilter(filter) {
        this.drawWordsWithoutFilter = false;
        filter
            .attr('height', '200%')
            .attr('width', '200%')
            .attr('x', '-50%')
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

    public waterFilter(filter) {
        this.drawWordsWithoutFilter = true;

        filter
            .append('feTurbulence')
            .attr('type', 'turbulence')
            .attr('baseFrequency', '0.4')
            .attr('numOctaves', '1');

        filter.append('feColorMatrix').attr('type', 'luminanceToAlpha');
        filter.append('feColorMatrix').attr('matrix', '0 0 0 -1 1 0 0 0 -1 1 0 0 0 -1 1 0 0 0 0 1');

        const transfer = filter.append('feComponentTransfer');

        transfer
            .append('feFuncR')
            .attr('type', 'table')
            .attr('tableValues', '0 0 0 .4 1');

        transfer
            .append('feFuncG')
            .attr('type', 'table')
            .attr('tableValues', '0 .15 .5 .9 1');
        transfer
            .append('feFuncB')
            .attr('type', 'table')
            .attr('tableValues', '0 0 .6 .8 1');
        transfer
            .append('feFuncA')
            .attr('type', 'linear')
            .attr('slope', '0.5')
            .attr('intercept', '0.0');
    }

    public drawWordCloud(words) {
        this.drawWordsIn(words, '#wwwmask', w => this.colorWhite(w));

        if (this.drawWordsWithoutFilter) {
            this.drawWordsIn(words, '#wwwwords', (w, d) => this.colorHsl(w, d));
        }

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            this.setFilter(w, 'wwwfilter');
        });
    }
}
