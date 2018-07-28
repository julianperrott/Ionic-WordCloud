import { Injectable, Injector } from '@angular/core';
import { GlowingStyle } from './styles/glowingStyle';
import { ShadowMaskStyle } from './styles/shadowMaskStyle';
import { SnowMaskStyle } from './styles/snowMaskStyle';
import { WaterMaskStyle } from './styles/waterMaskStyle';
import { StrokedStyle } from './styles/strokedStyle';
import { DropShadowStyle } from './styles/dropShadowStyle';
import { DistressedStyle } from './styles/distressedStyle';
import { SplashStyle } from './styles/splashStyle';
import { ScratchStyle } from './styles/scratchStyle';
import { Blop1Style } from './styles/blop1Style';
import { Blop2Style } from './styles/blop2Style';
import { Blop3Style } from './styles/blop3Style';
import { Blop4Style } from './styles/blop4Style';
import { PansenStyle } from './styles/pansenStyle';
import { ShadedStyle } from './styles/shadedStyle';
import { CircleStyle } from './styles/circleStyle';

@Injectable()
export class StyleFactory {
    constructor(private injector: Injector) {}

    public style = 'CircleStyle2';

    public getStyle(): IStyle {
        switch (this.style) {
            case 'GlowingStyle':
                return this.injector.get(GlowingStyle);
            case 'ShadowMaskStyle':
                return this.injector.get(ShadowMaskStyle);
            case 'SnowMaskStyle':
                return this.injector.get(SnowMaskStyle);
            case 'WaterMaskStyle':
                return this.injector.get(WaterMaskStyle);
            case 'StrokedStyle':
                return this.injector.get(StrokedStyle);
            case 'DropShadowStyle':
                return this.injector.get(DropShadowStyle);
            case 'DistressedStyle':
                return this.injector.get(DistressedStyle);
            case 'SplashStyle':
                return this.injector.get(SplashStyle);
            case 'ScratchStyle':
                return this.injector.get(ScratchStyle);
            case 'Blop1Style':
                return this.injector.get(Blop1Style);
            case 'Blop2Style':
                return this.injector.get(Blop2Style);
            case 'Blop3Style':
                return this.injector.get(Blop3Style);
            case 'Blop4Style':
                return this.injector.get(Blop4Style);
            case 'PansenStyle':
                return this.injector.get(PansenStyle);
            case 'ShadedStyle':
                return this.injector.get(ShadedStyle);
            case 'CircleStyle1':
                return this.circleStyle(0);
            case 'CircleStyle2':
                return this.circleStyle(1);
            case 'CircleStyle3':
                return this.circleStyle(2);
            case 'CircleStyle4':
                return this.circleStyle(3);
            case 'CircleStyle5':
                return this.circleStyle(4);
        }

        return this.injector.get(GlowingStyle);
    }

    circleStyle(i: number): IStyle {
        const style = this.injector.get(CircleStyle);
        style.pattern = style.patternHtml[i];
        return style;
    }
}
