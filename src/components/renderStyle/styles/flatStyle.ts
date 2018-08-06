import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';
import { StyleBaseClass } from '../StyleBaseClass';
import { IStyle } from '../iStyle';

@Injectable()
export class FlatStyle extends StyleBaseClass implements IStyle {
    constructor(configurationService: ConfigurationService) {
        super(configurationService);
    }

    padding = 2;

    defaultColours = [];

    public getStyleHtml(): string {
        return '';
    }

    public initialise(svg: any, w: number, h: number) {
    }

    public render(words) {
    }
}
