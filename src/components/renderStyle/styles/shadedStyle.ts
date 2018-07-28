import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class ShadedStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    filterHtml = `
    <!-- COLORS -->
    <feFlood flood-color="white" result="COLOR-white"></feFlood>
    <feFlood flood-color="black" result="COLOR-black"></feFlood>
    <!-- COLORS END -->

    <!-- FAT OUTLINE -->
    <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="FAT-OUTLINE_10"></feMorphology>
    <feConvolveMatrix in="FAT-OUTLINE_10" order="6,5" divisor="1" kernelMatrix="0 0 1 1 0 0
 0 1 1 1 1 0
 1 1 1 1 1 1
 0 1 1 1 1 0
 0 0 1 1 0 0 " result="FAT-OUTLINE_20"></feConvolveMatrix>
    <feOffset dx="4" dy="1" in="FAT-OUTLINE_20" result="FAT-OUTLINE_30"></feOffset>
    <!--  FAT OUTLINE END -->

    <!-- STRIPED SHADOW -->
    <feImage xlink:href="data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22100px%22%20height%3D%22200px%22%20%20%3E%0A%09%3Cdefs%3E%0A%09%09%3Cpattern%20id%3D%22pattern%22%20patternUnits%3D%22userSpaceOnUse%22%20width%3D%225px%22%20height%3D%225px%22%20viewBox%3D%220%200%205%205%22%20%3E%0A%09%09%09%3Cpolygon%20points%3D%225%2C0%204.012%2C0%205%2C0.989%20%09%22%2F%3E%0A%09%09%09%3Cpolygon%20points%3D%225%2C5%200%2C0%200%2C0.989%204.01%2C5%20%09%22%2F%3E%0A%09%09%3C%2Fpattern%3E%0A%09%3C%2Fdefs%3E%0A%09%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23pattern)%22%20%2F%3E%0A%3C%2Fsvg%3E" x="0" y="2" width="100" height="200" result="STRIPED-SHADOW_10"></feImage>
    <feTile in="STRIPED-SHADOW_10" width="100%" height="100%" result="STRIPED-SHADOW_20"></feTile>
    <feOffset dx="3" dy="4" in="FAT-OUTLINE_30" result="STRIPED-SHADOW_30"></feOffset>
    <feComposite operator="in" in="STRIPED-SHADOW_20" in2="STRIPED-SHADOW_30" result="STRIPED-SHADOW_40"></feComposite>
    <feComposite operator="in" in="COLOR-black" in2="STRIPED-SHADOW_40" result="STRIPED-SHADOW_50"></feComposite>
    <!--   STRIPED SHADOW END -->

    <!-- STRIPED FILL -->
    <feImage xlink:href="data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22100px%22%20height%3D%22200px%22%20%20%3E%0A%09%3Cdefs%3E%0A%09%09%3Cpattern%20id%3D%22pattern%22%20patternUnits%3D%22userSpaceOnUse%22%20width%3D%2210%22%20height%3D%2210%22%3E%0A%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M0%2C8.239V10h1.761L0%2C8.239z%22%2F%3E%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M5%2C0l5%2C5l0%2C0V3.238L6.762%2C0H5z%22%2F%3E%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%220%2C3.239%200%2C5%205%2C10%206.761%2C10%20%22%2F%3E%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%221.762%2C0%200%2C0%2010%2C10%2010%2C8.238%20%22%2F%3E%0A%09%09%3C%2Fpattern%3E%0A%09%3C%2Fdefs%3E%0A%09%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23pattern)%22%20%2F%3E%0A%3C%2Fsvg%3E" x="0" y="2" width="100" height="200" result="STRIPED-FILL_10"></feImage>
    <feTile width="100%" height="100%" in="STRIPED-FILL_10" result="STRIPED-FILL_20"></feTile>
    <feComposite operator="in" in="STRIPED-FILL_20" in2="SourceAlpha" result="STRIPED-FILL_30"></feComposite>
    <feComposite operator="in" in="COLOR-white" in2="STRIPED-FILL_30" result="STRIPED-FILL_40"></feComposite>
    <!-- STRIPED FILL END -->

    <!-- REFLECTION -->
    <feGaussianBlur stdDeviation="4" in="SourceAlpha" result="REFLECTION_10"></feGaussianBlur>
    <feSpecularLighting surfaceScale="5" specularConstant="5" specularExponent="20" lighting-color="#white" in="REFLECTION_10" result="REFLECTION_20">
        <fePointLight x="-100" y="-150" z="250">
        </fePointLight>
    </feSpecularLighting>
    <feComposite in2="SourceAlpha" operator="in" in="REFLECTION_20" result="REFLECTION_30"></feComposite>
    <!--  REFLECTION END -->

    <feMerge result="merge2">
        <feMergeNode in="STRIPED-SHADOW_50"></feMergeNode>
        <feMergeNode in="FAT-OUTLINE_30"></feMergeNode>
        <feMergeNode in="STRIPED-FILL_40"></feMergeNode>
        <feMergeNode in="REFLECTION_30"></feMergeNode>
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
