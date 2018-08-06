import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';
import { IStyle } from '../iStyle';

@Injectable()
export class ErosionStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    defaultColours = ['red', 'yellow'];

    public getStyleHtml(): string{
        return this.filterHtml;
    }

    strokeStyle = "black";
    strokeStyleEnabled = true;

    filterHtml = `
    <feTurbulence result="TURBULENCE" baseFrequency="0.08" numOctaves="1" seed="1" /> <feDisplacementMap in="SourceGraphic" in2="TURBULENCE" scale="8" />
    `;

    padding = 2;

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
        this.createFilter();
    }

    public createFilter() {
        document.getElementById('wwwfilter').innerHTML = this.filterHtml;
        document.getElementById('wwwfilter2').innerHTML = '<feGaussianBlur stdDeviation="3 3"></feGaussianBlur><feOffset in="blur" dx="10" dy="10"></feOffset>';
    }

    public render(words) {
        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorBlack(w);
            this.setFilter(w, 'wwwfilter2');
        });


        this.drawWordsIn(words, '#wwwwords2', (w, d) => {
            this.colorHsl(w, d);
            this.applyStrokeStyle(w,d,100);
            this.setFilter(w, 'wwwfilter');
        });
    }
}
