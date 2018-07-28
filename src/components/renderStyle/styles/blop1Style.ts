import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class Blop1Style extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    filterHtml = `
    <!-- COLORS -->
    <feFlood flood-color="#222" result="COLOR-outline"></feFlood>
    <!-- COLORS END -->

    <!-- OUTLINE -->
    <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="OUTLINE_10"></feMorphology>
    <feComposite in="COLOR-outline" operator="in" in2="OUTLINE_10" result="OUTLINE_20"></feComposite>
    <!-- OUTLINE END -->

    <!-- LIGHTING EFFECTS -->
    <feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS-10"></feGaussianBlur>
    <feSpecularLighting surfaceScale="5" specularConstant=".6" specularExponent="8" lighting-color="#blue" in="LIGHTING-EFFECTS-10" result="LIGHTING-EFFECTS-20">
        <fePointLight x="-100" y="-200" z="100"></fePointLight>
    </feSpecularLighting>
    <feComposite operator="in" in="LIGHTING-EFFECTS-20" in2="SourceAlpha" result="LIGHTING-EFFECTS-30"></feComposite>
    <feComposite in="SourceGraphic" in2="LIGHTING-EFFECTS-30" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="LIGHTING-EFFECTS-40"></feComposite>
    <!-- LIGHTING EFFECTS END-->

    <!-- COLOR EFFECTS -->
    <feComponentTransfer in="LIGHTING-EFFECTS-40" result="COLOR-EFFECTS_10">
        <feFuncR id="RedT" type="table" tableValues="0 6 1 0 3"></feFuncR>
        <feFuncG id="GrnT" type="table" tableValues="2 0 1 3 2"></feFuncG>
        <feFuncB id="BluT" type="table" tableValues="1 -1 0 1 1"></feFuncB>
    </feComponentTransfer>

    <feColorMatrix type="matrix" values="0.6 0.2 0 -0.3 0,
-0.5 1 0 -0.1 0,
-0.4 0.5 0.7 0 0,
0 0 0 1 0" in="COLOR-EFFECTS_10" result="COLOR-EFFECTS_20"></feColorMatrix>
    <!-- COLOR EFFECTS END-->

    <feMerge>
        <feMergeNode in="OUTLINE_20"></feMergeNode>
        <feMergeNode in="COLOR-EFFECTS_20"></feMergeNode>
    </feMerge>
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
        const settings = this.configurationService.settings;

        this.drawWordsIn(words, '#wwwwords2', (w, d) => {
            this.colorHsl(w, d);
            this.setFilter(w, 'wwwfilter');
        });
    }
}
