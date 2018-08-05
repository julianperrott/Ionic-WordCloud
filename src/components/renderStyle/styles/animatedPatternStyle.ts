import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';
import { IStyle } from '../iStyle';

@Injectable()
export class AnimatedPatternStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    htmlIndex: number;
    defaultColours = [];
    strokeStyle = this.strokeStyleRandom;
    strokeStyleEnabled = true;

    padding = 0;

    public initialise(svg: any, w: number, h: number) {
        super.initialise(svg, w, h);
        this.createPattern();
    }

    public getStyleHtml(): string{
        return '';
    }

    public createPattern() {
        document.getElementById('wwwdefs').innerHTML += this.patternHtml[this.htmlIndex];
    }

    public render(words) {
        this.drawWordsIn(words, '#wwwwords', (word, d) => {
            this.colorHsl(word, d);
            this.setFilter(word, 'wwwglowfilter');
        });

        this.drawWordsIn(words, '#wwwwords', (word, d) => {
            this.colorWhite(word);
        });

        this.drawWordsIn(words, '#wwwwords2', (word, d) => {
            this.setFill(word, 'p-anim-spots');
            this.applyStrokeStyle(word, d, 2);
        });
    }

    patternHtml = [
        `
    <pattern id="p-anim-spots" width="180" height="180" viewBox="0 0 90 90" patternUnits="userSpaceOnUse">
     <g class="g-anim-spots">
        <circle r="7" cx="15" cy="15"/>
        <circle r="5" cx="15" cy="15"/>
        <circle r="3" cx="15" cy="15"/>
        <circle r="1" cx="15" cy="15"/>
        <circle r="7" cx="45" cy="15"/>
        <circle r="5" cx="45" cy="15"/>
        <circle r="3" cx="45" cy="15"/>
        <circle r="1" cx="45" cy="15"/>
        <circle r="7" cx="75" cy="15"/>
        <circle r="5" cx="75" cy="15"/>
        <circle r="3" cx="75" cy="15"/>
        <circle r="1" cx="75" cy="15"/>
        <!--   -->
        <circle r="7" cx="15" cy="45"/>
        <circle r="5" cx="15" cy="45"/>
        <circle r="3" cx="15" cy="45"/>
        <circle r="1" cx="15" cy="45"/>
        <circle r="7" cx="45" cy="45"/>
        <circle r="5" cx="45" cy="45"/>
        <circle r="3" cx="45" cy="45"/>
        <circle r="1" cx="45" cy="45"/>
        <circle r="7" cx="75" cy="45"/>
        <circle r="5" cx="75" cy="45"/>
        <circle r="3" cx="75" cy="45"/>
        <circle r="1" cx="75" cy="45"/>
        <!--   -->
        <circle r="7" cx="15" cy="75"/>
        <circle r="5" cx="15" cy="75"/>
        <circle r="3" cx="15" cy="75"/>
        <circle r="1" cx="15" cy="75"/>
        <circle r="7" cx="45" cy="75"/>
        <circle r="5" cx="45" cy="75"/>
        <circle r="3" cx="45" cy="75"/>
        <circle r="1" cx="45" cy="75"/>
        <circle r="7" cx="75" cy="75"/>
        <circle r="5" cx="75" cy="75"/>
        <circle r="3" cx="75" cy="75"/>
        <circle r="1" cx="75" cy="75"/>
     </g>
   </pattern>
    `,
        `
    <pattern id="p-anim-spots" width="90" height="90" viewBox="0 0 45 45" patternUnits="userSpaceOnUse">
     <g class="g-anim-spots">
                <circle r="4" cx="7.5" cy="7.5"/>
                <circle r="3" cx="7.5" cy="7.5"/>
                <circle r="2" cx="7.5" cy="7.5"/>
                <circle r="1" cx="7.5" cy="7.5"/>

                <circle r="4" cx="22.5" cy="7.5"/>
                <circle r="3" cx="22.5" cy="7.5"/>
                <circle r="2" cx="22.5" cy="7.5"/>
                <circle r="1" cx="22.5" cy="7.5"/>

                <circle r="4" cx="37.5" cy="7.5"/>
                <circle r="3" cx="37.5" cy="7.5"/>
                <circle r="2" cx="37.5" cy="7.5"/>
                <circle r="1" cx="37.5" cy="7.5"/>

                <!--   -->
                <circle r="4" cx="7.5" cy="22.5"/>
                <circle r="3" cx="7.5" cy="22.5"/>
                <circle r="2" cx="7.5" cy="22.5"/>
                <circle r="1" cx="7.5" cy="22.5"/>

                <circle r="4" cx="22.5" cy="22.5"/>
                <circle r="3" cx="22.5" cy="22.5"/>
                <circle r="2" cx="22.5" cy="22.5"/>
                <circle r="1" cx="22.5" cy="22.5"/>

                <circle r="4" cx="37.5" cy="22.5"/>
                <circle r="3" cx="37.5" cy="22.5"/>
                <circle r="2" cx="37.5" cy="22.5"/>
                <circle r="1" cx="37.5" cy="22.5"/>
                <!--   -->
                <circle r="4" cx="7.5" cy="37.5"/>
                <circle r="3" cx="7.5" cy="37.5"/>
                <circle r="2" cx="7.5" cy="37.5"/>
                <circle r="1" cx="7.5" cy="37.5"/>

                <circle r="4" cx="22.5" cy="37.5"/>
                <circle r="3" cx="22.5" cy="37.5"/>
                <circle r="2" cx="22.5" cy="37.5"/>
                <circle r="1" cx="22.5" cy="37.5"/>

                <circle r="4" cx="37.5" cy="37.5"/>
                <circle r="3" cx="37.5" cy="37.5"/>
                <circle r="2" cx="37.5" cy="37.5"/>
                <circle r="1" cx="37.5" cy="37.5"/>
     </g>
   </pattern>
    `,
        `
    <pattern id="p-anim-spots" width="120" height="120" viewBox="0 0 60 60" patternUnits="userSpaceOnUse">
	<g class="g-anim-spots">
		<circle r="5" cx="15" cy="15"/>
		<circle r="5" cx="45" cy="15"/>
		<circle r="5" cx="75" cy="15"/>
		<circle r="5" cx="105" cy="15"/>

		<circle r="5" cx="15" cy="45"/>
		<circle r="5" cx="45" cy="45"/>
		<circle r="5" cx="75" cy="45"/>
		<circle r="5" cx="105" cy="45"/>

		<circle r="5" cx="15" cy="75"/>
		<circle r="5" cx="45" cy="75"/>
		<circle r="5" cx="75" cy="75"/>
		<circle r="5" cx="105" cy="75"/>

		<circle r="5" cx="15" cy="105"/>
		<circle r="5" cx="45" cy="105"/>
		<circle r="5" cx="75" cy="105"/>
		<circle r="5" cx="105" cy="105"/>
	</g>
 </pattern>
 `,
        `
<pattern id="p-anim-spots" width="50" height="30" viewBox="0 0 50 30" patternUnits="userSpaceOnUse">
<g class="g-anim-cells">
        <rect width="10" height="10" x="0"  y="0" />
        <rect width="10" height="10" x="10" y="0" />
        <rect width="10" height="10" x="20" y="0" />
        <rect width="10" height="10" x="30" y="0" />
        <rect width="10" height="10" x="40" y="0" />

        <rect width="10" height="10" x= "0" y="10"/>
        <rect width="10" height="10" x="10" y="10"/>
        <rect width="10" height="10" x="20" y="10"/>
        <rect width="10" height="10" x="30" y="10"/>
        <rect width="10" height="10" x="40" y="10"/>

        <rect width="10" height="10" x="0"  y="20"/>
        <rect width="10" height="10" x="10" y="20"/>
        <rect width="10" height="10" x="20" y="20"/>
        <rect width="10" height="10" x="30" y="20"/>
        <rect width="10" height="10" x="40" y="20"/>
</g>
</pattern>
 `,
        `
 <pattern id="p-anim-spots" viewBox="0 0 100 100" patternUnits="userSpaceOnUse" width="100" height="100">
        <path d="M 0,0 0,100" class="p-line"/>
        <path d="M 10,0 10,100" class="p-line"/>
        <path d="M 20,0 20,100" class="p-line"/>
        <path d="M 30,0 30,100" class="p-line"/>
        <path d="M 40,0 40,100" class="p-line"/>
        <path d="M 50,0 50,100" class="p-line"/>
        <path d="M 60,0 60,100" class="p-line"/>
        <path d="M 70,0 70,100" class="p-line"/>
        <path d="M 80,0 80,100" class="p-line"/>
        <path d="M 90,0 90,100" class="p-line"/>
        <path d="M 100,0 100,100" class="p-line"/>
</pattern>
`
    ];
}
