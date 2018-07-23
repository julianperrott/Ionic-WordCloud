import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GlowingStyle {
    constructor(private configurationService: ConfigurationService) {}

    svg: any;

    public initialise(svg: any) {
        this.svg = svg;

        const filter = this.svg
            .append('defs')
            .append('filter')
            .attr('id', 'glow')
            .attr('x', '-30%')
            .attr('y', '-30%')
            .attr('width', '160%')
            .attr('height', '160%');
        filter
            .append('feGaussianBlur')
            .attr('stdDeviation', '10 10')
            .attr('result', 'glow');

        const feMerge = filter.append('feMerge'); // glow count
        for (let i = 0; i < this.configurationService.settings.glowCount; i++) {
            feMerge.append('feMergeNode').attr('in', 'glow');
            feMerge.append('feMergeNode').attr('in', 'glow');
        }
    }

    public drawWordCloud(words) {
        const settings = this.configurationService.settings;

        const enter = this.svg
            .selectAll('g')
            .data(words)
            .enter();

        enter
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('font-family', d => (d.fontFace = settings.fontFace))
            .style('fill', (d, i) => {
                return 'hsl(' + d.color * 360 + ',100%,' + settings.lightnessGlow + ')';
            })
            .attr('text-anchor', 'middle')
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .attr('filter', 'url(#glow)')
            .text(d => {
                return d.text;
            });

        enter
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('stroke', d => settings.strokeColour) // stroke colour
            .style('stroke-opacity', d => settings.strokeOpacity) //  stroke opacity
            .style('stroke-width', d => {
                let scale = ~~(d.size / settings.strokeScale);
                scale = scale < settings.strokeMinWidth ? settings.strokeMinWidth : scale;
                return scale + 'px';
            }) // stroke size divider + min width
            .style(
                'font-family',
                d => (d.fontFace = settings.fontFace) // font face
            )
            .style('fill', (d, i) => {
                return 'hsl(' + d.color * 360 + ',100%, ' + settings.lightness + ')';
            })
            .attr('text-anchor', 'middle')
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .text(d => {
                return d.text;
            });
    }
}
