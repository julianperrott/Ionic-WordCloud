import { Injectable, Injector } from '@angular/core';
import { ConfigurationService } from '../../../services/configuration.service';

import { GlowingStyle } from './GlowingStyle';
import { ShadowMaskStyle } from './ShadowMaskStyle';
import { SnowMaskStyle } from './SnowMaskStyle';
import { WaterMaskStyle } from './WaterMaskStyle';
import { StrokedStyle } from './StrokedStyle';

@Injectable()
export class StyleFactory {
    constructor(private configurationService: ConfigurationService, private injector: Injector) {}

    public style = 'StrokedStyle';

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
        }

        return this.injector.get(GlowingStyle);
    }
}
