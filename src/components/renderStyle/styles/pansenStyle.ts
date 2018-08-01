import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';

@Injectable()
export class PansenStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    defaultColours = ['#663300', '#D7A500'];

    filterHtml = `
    <!-- COLORS -->
    <feFlood id="color1" flood-color="#663300" result="COLOR-red"></feFlood>‚
    <feFlood id="color2" flood-color="#D7A500" result="COLOR-y"></feFlood>
    <!-- COLORS END -->

    <!-- STRIPE FILL -->
    <feImage xlink:href="data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20id%3D%22Untitled-Seite_x25_201%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2210px%22%20height%3D%224px%22%3E%0A%3Crect%20fill%3D%22%239F6B00%22%20width%3D%2210%22%20height%3D%222%22%2F%3E%3C%2Fsvg%3E" x="0" y="0" width="10" height="4" result="STRIPE FILL_10"></feImage>
    <feTile in="STRIPE FILL_10" result="STRIPE FILL_20"></feTile>
    <feComposite operator="in" in="STRIPE FILL_20" in2="SourceAlpha" result="STRIPE FILL_30"></feComposite>
    <!-- STRIPE FILL END -->

    <!-- THIN BEVEL -->
    <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="THIN-BEVEL_10"></feMorphology>
    <feComposite operator="out" in="THIN-BEVEL_10" in2="SourceAlpha" result="THIN-BEVEL_20"></feComposite>
    <feComposite operator="in" in="COLOR-y" in2="THIN-BEVEL_20" result="THIN-BEVEL_30"></feComposite>
    <!-- THIN BEVEL END -->

    <!-- OUTER BEVEL -->
    <feConvolveMatrix order="8,8" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 " in="SourceGraphic" result="OUTER-BEVEL_10"></feConvolveMatrix>
    <feOffset dx="2" dy="2" in="OUTER-BEVEL_10" result="OUTER-BEVEL_20"></feOffset>
    <feComposite operator="in" in="COLOR-red" in2="OUTER-BEVEL_20" result="OUTER-BEVEL_30"></feComposite>
    <!-- OUTER BEVEL END -->

    <!-- INNER BEVEL -->
    <feOffset in="SourceAlpha" dx="2" dy="2" result="INNER-BEVEL_10"></feOffset>
    <feComposite operator="out" in="SourceAlpha" in2="INNER-BEVEL_10" result="INNER-BEVEL_20"></feComposite>
    <feComposite in="COLOR-red" operator="in" in2="INNER-BEVEL_20" result="INNER-BEVEL_30"></feComposite>
    <!--  INNER BEVEL END -->

    <!-- FAT OUTLINE -->
    <feMorphology operator="dilate" radius="3" in="OUTER-BEVEL_30" result="FAT-OUTLINE_10"></feMorphology>
    <feComposite operator="in" in="COLOR-y" in2="FAT-OUTLINE_10" result="FAT-OUTLINE_20"></feComposite>
    <!-- FAT OUTLINE END -->

    <feMerge result="merge2">
        <feMergeNode in="FAT-OUTLINE_20"></feMergeNode>
        <feMergeNode in="OUTER-BEVEL_30"></feMergeNode>
        <feMergeNode in="STRIPE FILL_30"></feMergeNode>
        <feMergeNode in="INNER-BEVEL_30"></feMergeNode>
        <feMergeNode in="THIN-BEVEL_30"></feMergeNode>
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
        this.drawWordsIn(words, '#wwwwords2', (w, d) => {
            this.colorHsl(w, d);
            this.setFilter(w, 'wwwfilter');
        });
    }
}
