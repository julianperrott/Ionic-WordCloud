import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class StrokedStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    padding = 4;

    defaultColours = [];

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
    }

    public calculateStrokeSize(d, multiplier: number) {
        const settings = this.configurationService.settings;
        let scale = ~~(d.size / settings.strokeScale) * multiplier;
        scale = scale < settings.strokeMinWidth ? settings.strokeMinWidth : scale;
        return scale + 'px';
    }

    public render(words) {
        const settings = this.configurationService.settings;

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            const hsl = 'hsl(' + (Math.floor(d.color * 360 + 180) % 360) + ',100%,' + settings.lightnessGlow + ')';
            w.style('stroke', () => hsl).style('stroke-width', () => this.calculateStrokeSize(d, 3.5));
        });

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            w.style('stroke', () => 'black').style('stroke-width', () => this.calculateStrokeSize(d, 2));
        });

        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            this.colorHsl(w, d);
            w.style('stroke', () => 'white').style('stroke-width', () => this.calculateStrokeSize(d, 0.5));
        });
    }
}
