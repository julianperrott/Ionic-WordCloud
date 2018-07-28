import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class ScratchStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    filterHtml = `
    <!-- COLOR -->
    <feFlood flood-color="red" flood-opacity="0.8" result="COLOR-blu"></feFlood>
    <feFlood flood-color="yellow" flood-opacity="0.6" result="COLOR-red"></feFlood>
    <!-- COLOR END -->

    <!-- Texture -->
    <feTurbulence baseFrequency=".05" type="fractalNoise" numOctaves="3" seed="0" result="Texture_10"></feTurbulence>
    <feColorMatrix type="matrix" values="0 0 0 0 0,
0 0 0 0 0,
0 0 0 0 0,
0 0 0 -2.1 1.1" in="Texture_10" result="Texture_20"></feColorMatrix>

    <feColorMatrix result="Texture_30" type="matrix" values="0 0 0 0 0,
0 0 0 0 0,
0 0 0 0 0,
0 0 0 -1.7 1.8" in="Texture_10"></feColorMatrix>
    <!-- Texture -->

    <!-- FILL -->
    <feOffset dx="-2" dy="2" in="SourceAlpha" result="FILL_10"></feOffset>
    <feDisplacementMap scale="5" in="FILL_10" in2="Texture_10" result="FILL_20"></feDisplacementMap>
    <feComposite operator="in" in="Texture_30" in2="FILL_20" result="FILL_40"></feComposite>
    <feComposite operator="in" in="COLOR-blu" in2="FILL_40" result="FILL_50"></feComposite>
    <!-- FILL END-->

    <!-- OUTLINE -->
    <feMorphology operator="dilate" radius="3" in="SourceAlpha" result="OUTLINE_10"></feMorphology>
    <feComposite operator="out" in="OUTLINE_10" in2="SourceAlpha" result="OUTLINE_20"></feComposite>
    <feDisplacementMap scale="5" in="OUTLINE_20" in2="Texture_10" result="OUTLINE_30"></feDisplacementMap>
    <feComposite operator="arithmetic" k2="-1" k3="1" in="Texture_20" in2="OUTLINE_30" result="OUTLINE_40"></feComposite>
    <!-- OUTLINE END-->

    <!-- BEVEL OUTLINE -->
    <feConvolveMatrix order="8,8" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 " in="SourceAlpha" result="BEVEL_10"></feConvolveMatrix>
    <feMorphology operator="dilate" radius="2" in="BEVEL_10" result="BEVEL_20"></feMorphology>
    <feComposite operator="out" in="BEVEL_20" in2="BEVEL_10" result="BEVEL_30"></feComposite>
    <feDisplacementMap scale="5" in="BEVEL_30" in2="Texture_10" result="BEVEL_40"></feDisplacementMap>
    <feComposite operator="arithmetic" k2="-1" k3="1" in="Texture_20" in2="BEVEL_40" result="BEVEL_50"></feComposite>
    <feOffset dx="-3" dy="-3" in="BEVEL_50" result="BEVEL_60"></feOffset>
    <feComposite operator="out" in="BEVEL_60" in2="OUTLINE_10" result="BEVEL_70"></feComposite>
    <!-- BEVEL OUTLINE END -->

    <!-- BEVEL FILL -->
    <feOffset dx="-3" dy="-3" in="BEVEL_10" result="BEVEL-FILL_10"></feOffset>
    <feComposite operator="out" in="BEVEL-FILL_10" in2="OUTLINE_10" result="BEVEL-FILL_20"></feComposite>
    <feDisplacementMap scale="5" in="BEVEL-FILL_20" in2="Texture_10" result="BEVEL-FILL_30"></feDisplacementMap>
    <feComposite operator="in" in="COLOR-red" in2="BEVEL-FILL_30" result="BEVEL-FILL_50"></feComposite>
    <!-- -->
    <!-- BEVEL FILL END-->

    <feMerge result="merge2">
        <feMergeNode in="BEVEL-FILL_50"></feMergeNode>
        <feMergeNode in="BEVEL_70"></feMergeNode>
        <feMergeNode in="FILL_50"></feMergeNode>
        <feMergeNode in="OUTLINE_40"></feMergeNode>
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
