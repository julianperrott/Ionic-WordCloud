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

    public getStyleHtml(): string {
        return '<feGaussianBlur stdDeviation="2 2" result="stage1Filter"></feGaussianBlur><feMerge><feMergeNode in="stage1Filter"></feMergeNode><feMergeNode in="stage1Filter"></feMergeNode></feMerge>';
    }

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
    }

    public render(words) {
        this.drawWordsIn(words, '#wwwwords', (word, d) => {
            this.colorHsl(word, d);
            this.setFilter(word, 'wwwglowfilter');
        });

        this.drawWordsIn(words, '#wwwwords2', (word, d) => {
            this.colorHsl(word, d);
            this.applyStrokeStyle(word, d, 1);
        });
    }
}
