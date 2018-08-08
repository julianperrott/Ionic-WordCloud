import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';
import { IStyle } from '../iStyle';

@Injectable()
export class StrokedStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    padding = 4;

    strokeStyle = 'UNDEFINED';
    strokeStyleEnabled = false;

    defaultColours = [];

    public getStyleHtml(): string {
        return '';
    }

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
    }

    public calculateStrokeSize(d, multiplier: number) {
        let scale = ~~(d.size / this.strokeScale) * multiplier;
        scale = scale < this.strokeMinWidth ? this.strokeMinWidth : scale;
        return scale + 'px';
    }

    public render(words) {
        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            const hsl =
                'hsl(' +
                (Math.floor(d.color * 360 + 180) % 360) +
                ',' +
                this.configurationService.saturation +
                '%,' +
                this.configurationService.lightness +
                '%)';
            w.style('stroke', () => hsl).style('stroke-width', () =>
                this.calculateStrokeSize(d, 3.5)
            );
        });

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            w.style('stroke', () => 'black').style('stroke-width', () =>
                this.calculateStrokeSize(d, 2)
            );
        });

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            w.style('stroke', () => 'white').style('stroke-width', () =>
                this.calculateStrokeSize(d, 0.5)
            );
        });
    }
}
