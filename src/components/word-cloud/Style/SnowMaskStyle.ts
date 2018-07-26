import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { MaskStyleBaseClass } from './MaskStyleBaseClass';

@Injectable()
export class SnowMaskStyle extends MaskStyleBaseClass {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    circles: any;
    padding = 0;

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
        this.addMask();
        this.drawCircles();
    }

    public drawCircles() {
        const jsonCircles = [];
        for (let i = 0; i < 2000; i++) {
            const cx = Math.floor(Math.random() * this.w - this.w / 2);
            const cy = Math.floor(Math.random() * this.h - this.h / 2);
            jsonCircles.push({
                cx: cx,
                cy: cy,
                xOffset: cx,
                yOffset: cy,
                radius: Math.random() * (this.h > this.w ? this.w : this.h) * 0.03,
                opacity: Math.random() + 0.1,
                color: 'white',
                counter: Math.random() * 360
            });
        }

        this.circles = this.svg
            .selectAll('g')
            .data(jsonCircles)
            .enter()
            .append('circle');

        this.circles
            .attr('cx', d => d.cx)
            .attr('cy', d => d.cy)
            .attr('r', d => d.radius)
            .attr('opacity', d => d.opacity)
            .style('fill', d => d.color);
    }

    public animate() {
        const increase = (Math.PI * 2) / 40;

        this.circles
            .attr('cx', d => {
                const x = d.xOffset + (50 * Math.sin(d.counter)) / 5;
                d.counter += increase;
                return x;
            })
            .attr('cy', d => {
                d.cy = d.cy < -this.h / 2 ? this.h / 2 : d.cy - 2;
                return d.cy;
            });

        if (!this.configurationService.isBusy()) {
            // window.requestAnimationFrame(() => this.animate());
        }
    }

    public drawWordCloud(words) {
        this.drawWordsIn(words, '#wwwmask', w => this.colorWhite(w));
        this.drawWordsIn(words, '#wwwwords', (w, d) => this.colorHsl(w, d));
        this.animate();
    }
}
