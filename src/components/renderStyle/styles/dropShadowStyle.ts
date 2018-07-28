import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class DropShadowStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    padding = 2;

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

        this.drawWordsIn(words, '#wwwwords2', (w, d) => {
            this.colorHsl(w, d);

            w.style('stroke', () => settings.strokeColour) // stroke colour
                .style('stroke-opacity', () => settings.strokeOpacity) //  stroke opacity
                .style('stroke-width', () => {
                    let scale = ~~(d.size / settings.strokeScale);
                    scale = scale < settings.strokeMinWidth ? settings.strokeMinWidth : scale;
                    return scale + 'px';
                }); // stroke size divider + min width
        });
    }
}
