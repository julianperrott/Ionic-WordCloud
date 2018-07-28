import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class Blop2Style extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    filterHtml = `
    <!-- COLORS -->
    <feFlood flood-color="#551C0B" result="COLOR-outline"></feFlood>
    <!-- COLORS END-->

    <!-- OUTLINE -->
    <feMorphology operator="dilate" radius="3" in="SourceAlpha" result="OUTLINE_10"></feMorphology>
    <feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20"></feComposite>
    <!-- OUTLINE END -->

    <!-- LIGHTING EFFECTS -->
    <feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10"></feGaussianBlur>
    <feSpecularLighting surfaceScale="5" specularConstant="0.8" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20">
        <fePointLight x="-250" y="-50" z="300"></fePointLight>
    </feSpecularLighting>
    <feComposite operator="in" in="LIGHTING-EFFECTS_20" in2="SourceAlpha" result="LIGHTING-EFFECTS_30"></feComposite>
    <feComposite in="SourceGraphic" in2="LIGHTING-EFFECTS_30" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="LIGHTING-EFFECTS_40"></feComposite>
    <!-- LIGHTING EFFECTS END -->

    <!-- COLOR EFFECTS -->
    <feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10">
        <feFuncR type="gamma" offset="-0.3" amplitude="1.1" exponent="4.84"></feFuncR>
        <feFuncG type="gamma" offset="-0.3" amplitude="3.1" exponent="4.84"></feFuncG>
        <feFuncB type="gamma" offset="13.3" amplitude="0.1" exponent="1.84"></feFuncB>
    </feComponentTransfer>
    <!-- COLOR EFFECTS END -->

    <feMerge>
        <feMergeNode in="OUTLINE_20"></feMergeNode>
        <feMergeNode in="COLOR-EFFECTS_10"></feMergeNode>
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
