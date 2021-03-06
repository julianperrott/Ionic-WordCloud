import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';
import { IStyle } from '../iStyle';

@Injectable()
export class WaterMaskStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    padding = 0;

    defaultColours = [];

    strokeStyle = this.strokeStyleDefault;
    strokeStyleEnabled = true;

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
        this.addMask();
        this.createFilter(this.filter);
    }

    public getStyleHtml(): string {
        return '<feTurbulence type="turbulence" baseFrequency="0.4" numOctaves="1"></feTurbulence><feColorMatrix type="luminanceToAlpha"></feColorMatrix><feColorMatrix matrix="0 0 0 -1 1 0 0 0 -1 1 0 0 0 -1 1 0 0 0 0 1"></feColorMatrix><feComponentTransfer><feFuncR type="table" tableValues="0 0 0 .4 1"></feFuncR><feFuncG type="table" tableValues="0 .15 .5 .9 1"></feFuncG><feFuncB type="table" tableValues="0 0 .6 .8 1"></feFuncB><feFuncA type="linear" slope="0.5" intercept="0.0"></feFuncA></feComponentTransfer>';
    }

    public createFilter(filter) {
        filter
            .append('feTurbulence')
            .attr('type', 'turbulence')
            .attr('baseFrequency', '0.4')
            .attr('numOctaves', '1');

        filter.append('feColorMatrix').attr('type', 'luminanceToAlpha');
        filter
            .append('feColorMatrix')
            .attr('matrix', '0 0 0 -1 1 0 0 0 -1 1 0 0 0 -1 1 0 0 0 0 1');

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

    public render(words) {
        this.drawWordsIn(words, '#wwwmask', w => this.colorWhite(w));

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            this.applyStrokeStyle(w, d, 1);
        });

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            this.setFilter(w, 'wwwfilter');
        });
    }
}
