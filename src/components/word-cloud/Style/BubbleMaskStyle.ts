import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BubbleMaskStyle {
    constructor(private configurationService: ConfigurationService) {}

    svg: any;
    w: number;
    h: number;
    circles: any;

    public initialise(svg: any, w: number, h: number) {
        this.svg = svg;
        this.h = h;
        this.w = w;

        const jsonCircles = [];

        for (let i = 0; i < 2000; i++) {
            const cx = Math.floor(Math.random() * w - w / 2);
            const cy = Math.floor(Math.random() * h - h / 2);
            jsonCircles.push({
                cx: cx,
                cy: cy,
                xOffset: cx,
                yOffset: cy,
                radius: Math.random() * (h > w ? w : h) * 0.03,
                opacity: Math.random() + 0.1,
                color: 'white',
                counter: Math.random() * 360
            });
        }

        this.svg
            .append('defs')
            .append('mask')
            .attr('id', 'wwwmask');

        this.svg.attr('mask', 'url(#wwwmask)');

        this.svg.append('g').attr('id', 'wwwwords');

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
        const settings = this.configurationService.settings;

        const filter = this.svg.select('#wwwmask');

        words.forEach(d => {
            filter
                .append('text')
                .style('font-size', () => d.size + 'px')
                .style(
                    'font-family',
                    () => (d.fontFace = settings.fontFace) // font face
                )
                .style('fill', () => {
                    return 'hsl(100,100%, 100%)';
                })
                .attr('text-anchor', 'middle')
                .attr('transform', () => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                .text(() => {
                    return d.text;
                });
        });

        const wordElement = this.svg.select('#wwwwords');
        words.forEach(d => {
            wordElement
                .append('text')
                .style('font-size', () => d.size + 'px')
                .style('font-family', () => (d.fontFace = settings.fontFace))
                .style('fill', () => 'hsl(' + d.color * 360 + ',100%,' + settings.lightnessGlow + ')')
                .attr('text-anchor', 'middle')
                .attr('transform', () => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                .attr('filter', 'url(#glow)')
                .text(() => d.text);

            wordElement
                .append('text')
                .style('font-size', () => d.size + 'px')
                .style(
                    'font-family',
                    () => (d.fontFace = settings.fontFace) // font face
                )
                .style('fill', () => 'hsl(' + d.color * 360 + ',100%, ' + settings.lightness + ')')
                .attr('text-anchor', 'middle')
                .attr('transform', () => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                .text(() => d.text);
        });

        this.animate();
    }
}
