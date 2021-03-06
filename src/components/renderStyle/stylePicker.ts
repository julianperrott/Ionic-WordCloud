import { Component } from '@angular/core';
import {
    NavController,
    NavParams,
    PopoverController,
    ViewController
} from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { Events } from 'ionic-angular';
import { StyleFactory } from '../renderStyle/styleFactory';
import { Event } from '../../services/event';

@Component({
    selector: 'page-popover',
    templateUrl: 'stylePicker.html'
})
export class StylePicker {
    public style;

    public strokeStyle;
    public strokeStyleEnabled;

    public strokeColor;

    busy = false;

    readonly COLOR1_CHANGED = Event.COLOR1_CHANGED;
    readonly COLOR2_CHANGED = Event.COLOR2_CHANGED;
    readonly COLOR3_CHANGED = Event.COLOR3_CHANGED;
    readonly STROKE_COLOR_CHANGED = Event.STROKE_COLOR_CHANGED;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        events: Events,
        public viewController: ViewController,
        public styleFactory: StyleFactory
    ) {
        const selectedStyle = styleFactory.styles.filter(
            s => s.key === this.configurationService.style
        );

        this.strokeStyle = this.configurationService.strokeStyle;

        if (selectedStyle.length > 0) {
            this.style = selectedStyle[0];
            this.refreshForm();
        }

        if (!this.configurationService.wordColors) {
            this.styleChanged();
        }

        events.subscribe(Event.COLOR1_CHANGED, color => {
            this.setWordColor(0, color);
        });
        events.subscribe(Event.COLOR2_CHANGED, color => {
            this.setWordColor(1, color);
        });
        events.subscribe(Event.COLOR3_CHANGED, color => {
            this.setWordColor(2, color);
        });

        events.subscribe(Event.STROKE_COLOR_CHANGED, color => {
            this.strokeColor = color;
            this.configurationService.strokeStyle = color;
            this.configurationService.styleChanged('');
        });
    }

    setWordColor(i: number, color: string) {
        this.configurationService.wordColors[i].color = color;
        this.configurationService.setFloodColor('color' + (i + 1), color);
    }

    refreshForm() {
        this.busy = true;
        const style = this.styleFactory.getStyle();

        this.configurationService.setStrokeStyle(style);
        this.strokeStyleEnabled = style.strokeStyleEnabled;

        if (this.strokeStyleEnabled) {
            if (!this.strokeStyle) {
                this.strokeStyle = style.strokeStyle;
            }

            if (this.strokeStyle.indexOf('#') > -1) {
                this.strokeColor = this.strokeStyle;
                this.strokeStyle = 'CUSTOM';
            } else {
                this.strokeColor = 'blue';
            }
        }
        this.busy = false;
    }

    styleChanged() {
        setTimeout(() => {
            this.configurationService.style = this.style.key;
            const style = this.styleFactory.getStyle();

            this.configurationService.wordColors = [];
            style.defaultColours.forEach((c, i) =>
                this.configurationService.wordColors.push({
                    color: c,
                    index: i
                })
            );

            this.strokeStyle = undefined;

            this.refreshForm();
            this.configurationService.styleChanged('');
        }, 100);
    }

    strokeStyleChanged() {
        if (this.busy) {
            return;
        }

        setTimeout(() => {
            this.configurationService.strokeStyle =
                this.strokeStyle === 'CUSTOM'
                    ? this.strokeColor
                    : this.strokeStyle;
            this.configurationService.styleChanged('');
        }, 100);
    }
}
