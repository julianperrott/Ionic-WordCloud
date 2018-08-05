import { Injectable, Injector } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { IStyle } from './iStyle';
import { GlowingStyle } from './styles/glowingStyle';
import { ShadowMaskStyle } from './styles/shadowMaskStyle';
import { SnowMaskStyle } from './styles/snowMaskStyle';
import { WaterMaskStyle } from './styles/waterMaskStyle';
import { StrokedStyle } from './styles/strokedStyle';
import { DropShadowStyle } from './styles/dropShadowStyle';
import { DistressedStyle } from './styles/distressedStyle';
import { SplashStyle } from './styles/splashStyle';
import { ScratchStyle } from './styles/scratchStyle';
import { BlopStyle } from './styles/blopStyle';
import { PansenStyle } from './styles/pansenStyle';
import { ShadedStyle } from './styles/shadedStyle';
import { AnimatedPatternStyle } from './styles/animatedPatternStyle';
import { Type } from '../../../node_modules/@angular/compiler/src/core';

export interface Style {
    type?: Type;
    key: string;
    create?: Function;
}

@Injectable()
export class StyleFactory {
    constructor(private injector: Injector, private configurationService: ConfigurationService) {}

    public styles: Style[] = [
        { type: GlowingStyle, key: 'Glowing' },
        { key: 'Circle Pattern 1 (Animated)', create: () => this.animatedPatternStyle(0) },
        { key: 'Circle Pattern 2 (Animated)', create: () => this.animatedPatternStyle(1) },
        { key: 'Circle Pattern 3 (Animated)', create: () => this.animatedPatternStyle(2) },
        { key: 'Square Pattern (Animated)', create: () => this.animatedPatternStyle(3) },
        { key: 'Stripe Pattern (Animated)', create: () => this.animatedPatternStyle(4) },
        { type: SnowMaskStyle, key: 'Snowy (Animated)' },
        { type: StrokedStyle, key: 'Stroked' },
        { type: DropShadowStyle, key: 'Drop Shadow' },
        { type: SplashStyle, key: 'Moltern Metal' },
        { type: ScratchStyle, key: 'Scratch' },
        { key: 'Blop 1', create: () => this.blopStyle(0) },
        { key: 'Blop 2', create: () => this.blopStyle(1) },
        { key: 'Blop 3', create: () => this.blopStyle(2) },
        { key: 'Blop 4', create: () => this.blopStyle(3) },
        { type: PansenStyle, key: 'Pansen' },
        { type: ShadedStyle, key: 'Shaded' },
        { type: DistressedStyle, key: 'Distressed' },
        { type: ShadowMaskStyle, key: 'Sunken' },
        { type: WaterMaskStyle, key: 'Grubby' }
    ];

    public getStyle(): IStyle {
        let selectedStyles = this.styles.filter(s => s.key === this.configurationService.style);
        if (selectedStyles.length === 0) {
            selectedStyles = this.styles;
        }

        return this.getStyleByName(selectedStyles[0]);
    }

    public getStyleByName(selectedStyle): IStyle {
        
        if (selectedStyle.create !== undefined) {
            return selectedStyle.create();
        }

        return this.injector.get(selectedStyle.type);
    }

    animatedPatternStyle(i: number): IStyle {
        const style = this.injector.get(AnimatedPatternStyle);
        style.htmlIndex = i;
        return style;
    }

    blopStyle(i: number): IStyle {
        const style = this.injector.get(BlopStyle);
        style.htmlIndex = i;
        return style;
    }
}
