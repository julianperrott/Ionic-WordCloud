import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class DistressedStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    filterHtml = `
        <feFlood id="color1" flood-color="blue" result="COLOR-background"></feFlood>
        <!-- FRACTAL TEXTURE -->
        <feTurbulence baseFrequency=".05,.004" top="-50%" type="fractalNoise" numOctaves="4" seed="0" result="FRACTAL-TEXTURE_10"></feTurbulence>
        <feColorMatrix type="matrix" values="0 0 0 0 0,
      0 0 0 0 0,
      0 0 0 0 0,
      0 0 0 -1.2 1.1" in="FRACTAL-TEXTURE_10" result="FRACTAL-TEXTURE_20"></feColorMatrix>
        <!-- FRACTAL TEXTURE END -->
        <!-- STROKE (White border around the letters)-->
        <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="STROKE_10"></feMorphology>
        <!-- STROKE END -->
        <!-- EXTRUDED BEVEL -->
        <feConvolveMatrix order="8,8" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1"
            in="STROKE_10" result="BEVEL_20"></feConvolveMatrix>
        <feOffset dx="3" dy="3" in="BEVEL_20" result="BEVEL_25"></feOffset>
        <feComposite operator="out" in="BEVEL_25" in2="STROKE_10" result="BEVEL_30"></feComposite>
        <feComposite in="COLOR-background" in2="BEVEL_30" operator="in" result="BEVEL_40"></feComposite>
        <feMerge result="BEVEL_50">
            <feMergeNode in="BEVEL_40"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
        <!-- EXTRUDED BEVEL END -->
        <feComposite in2="FRACTAL-TEXTURE_20" in="BEVEL_50" operator="in"></feComposite>
    `;

    padding = 2;

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
        this.createFilter();
    }

    public createFilter() {
        document.getElementById('wwwfilter').innerHTML = this.filterHtml;
    }

    public render(words) {
        this.drawWordsIn(words, '#wwwwords', (w, d) => {
            const hsl = 'hsl(' + Math.floor(d.color * 360) + ',100%,20%)';
            w.style('fill', hsl);
        });

        this.drawWordsIn(words, '#wwwwords2', (w, d) => {
            this.colorHsl(w, d);
            this.setFilter(w, 'wwwfilter');
        });
    }
}
