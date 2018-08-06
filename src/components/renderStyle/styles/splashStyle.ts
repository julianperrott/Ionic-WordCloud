import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';
import { IStyle } from '../iStyle';

@Injectable()
export class SplashStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    defaultColours = ['#805D8F', '#4A2066', '#755B8F'];

    public getStyleHtml(): string{
        return this.filterHtml;
    }

    filterHtml = `
    <!-- COLORS -->
    <feFlood id="color1" flood-color="#805D8F" result="COLOR-blue"></feFlood>
    <feFlood id="color2" flood-color="#4A2066" result="COLOR-violet"></feFlood>
    <feFlood id="color3" flood-color="#755B8F" result="COLOR-violet-light"></feFlood>
    <!-- COLORS END -->

    <!-- BOTTOM SPLASH -->
    <feTurbulence baseFrequency="0.05" type="fractalNoise" numOctaves="1" seed="2" result="BOTTOM-SPLASH_10"></feTurbulence>
    <feGaussianBlur stdDeviation="6.5" in="SourceAlpha" result="BOTTOM-SPLASH_20"></feGaussianBlur>
    <feDisplacementMap scale="420" in="BOTTOM-SPLASH_20" in2="BOTTOM-SPLASH_10" result="BOTTOM-SPLASH_30"></feDisplacementMap>
    <feComposite operator="in" in="COLOR-blue" in2="BOTTOM-SPLASH_30" result="BOTTOM-SPLASH_40"></feComposite>
    <!-- BOTTOM END -->

    <!-- MIDDLE SPLASH -->
    <feTurbulence baseFrequency="0.1" type="fractalNoise" numOctaves="1" seed="1" result="MIDDLE-SPLASH_10"></feTurbulence>
    <feGaussianBlur in="SourceAlpha" stdDeviation="0.1" result="MIDDLE-SPLASH_20"></feGaussianBlur>
    <feDisplacementMap in="MIDDLE-SPLASH_20" in2="MIDDLE-SPLASH_10" scale="3" result="MIDDLE-SPLASH_30"></feDisplacementMap>
    <feComposite in="COLOR-violet-light" in2="MIDDLE-SPLASH_30" operator="in" result="MIDDLE-SPLASH_40"></feComposite>
    <!-- MIDDLE END -->

    <!-- TOP SPLASH -->
    <feTurbulence baseFrequency="0.07" type="fractalNoise" numOctaves="1" seed="1" result="TOP-SPLASH_10"></feTurbulence>
    <feGaussianBlur stdDeviation="3.5" in="SourceAlpha" result="TOP-SPLASH_20"></feGaussianBlur>
    <feDisplacementMap scale="220" in="TOP-SPLASH_20" in2="TOP-SPLASH_10" result="TOP-SPLASH_30"></feDisplacementMap>
    <feComposite operator="in" in="COLOR-violet" in2="TOP-SPLASH_30" result="TOP-SPLASH_40"></feComposite>
    <!-- TOP END -->

    <!-- LIGHT EFFECTS -->
    <feMerge result="LIGHT-EFFECTS_10">
        <feMergeNode in="BOTTOM-SPLASH_40"></feMergeNode>
        <feMergeNode in="MIDDLE-SPLASH_40"></feMergeNode>
        <feMergeNode in="TOP-SPLASH_40"></feMergeNode>
    </feMerge>
    <feColorMatrix type="matrix" values="0 0 0 0 0,
0 0 0 0 0,
0 0 0 0 0,
0 0 0 1 0" in="LIGHT-EFFECTS_10" result="LIGHT-EFFECTS_20"></feColorMatrix>
    <feGaussianBlur stdDeviation="2" in="LIGHT-EFFECTS_20" result="LIGHT-EFFECTS_30"></feGaussianBlur>
    <feSpecularLighting surfaceScale="5" specularConstant=".75" specularExponent="30" lighting-color="white" in="LIGHT-EFFECTS_30" result="LIGHT-EFFECTS_40">
        <fePointLight x="-50" y="-100" z="400"></fePointLight>
    </feSpecularLighting>
    <feComposite operator="in" in="LIGHT-EFFECTS_40" in2="LIGHT-EFFECTS_20" result="LIGHT-EFFECTS_50"></feComposite>
    <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="LIGHT-EFFECTS_10" in2="LIGHT-EFFECTS_50" result="LIGHT-EFFECTS_60"></feComposite>
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
        this.drawWordsIn(words, '#wwwwords2', (w, d) => {
            this.colorHsl(w, d);
            this.setFilter(w, 'wwwfilter');
        });
    }
}
