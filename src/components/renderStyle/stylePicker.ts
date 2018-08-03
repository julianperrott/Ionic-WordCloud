import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { Events } from 'ionic-angular';
import { StyleFactory } from '../renderStyle/styleFactory';

import { ColorPicker } from '../color-picker/color-picker';

@Component({
    selector: 'page-popover',
    templateUrl: 'stylePicker.html'
})
export class StylePicker {
    public style;

    public color1Enabled = false;
    public color2Enabled = false;
    public color3Enabled = false;
    public color1;
    public color2;
    public color3;

    public strokeStyle;
    public strokeStyleEnabled;

    public strokeColor;

    colourCount = 0;
    busy = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        events: Events,
        public viewController: ViewController,
        public styleFactory: StyleFactory
    ) {
        const selectedStyle = styleFactory.styles.filter(s => s.key === this.configurationService.style);
        this.color1Enabled = this.configurationService.color1 !== undefined;
        this.color2Enabled = this.configurationService.color2 !== undefined;
        this.color3Enabled = this.configurationService.color3 !== undefined;
        this.color1 = this.configurationService.color1;
        this.color2 = this.configurationService.color2;
        this.color3 = this.configurationService.color3;
        this.strokeStyle = this.configurationService.strokeStyle;

        if (selectedStyle.length > 0) {
            this.style = selectedStyle[0];
            this.refreshForm();
        }

        events.subscribe('color1Changed', color => {
            this.configurationService.color1 = color;
            this.color1 = color;
            this.configurationService.setFloodColor('color1', this.configurationService.color1);
        });

        events.subscribe('color2Changed', color => {
            this.configurationService.color2 = color;
            this.color2 = color;
            this.configurationService.setFloodColor('color2', this.configurationService.color2);
        });

        events.subscribe('color3Changed', color => {
            this.configurationService.color3 = color;
            this.color3 = color;
            this.configurationService.setFloodColor('color3', this.configurationService.color3);
        });

        events.subscribe('strokeColorChanged', color => {
            this.configurationService.color3 = color;
            this.color3 = color;
            this.configurationService.strokeStyle = color;
            this.configurationService.styleChanged('');
        });
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

        this.colourCount = style.defaultColours.length;

        if (this.colourCount > 0 && !this.color1Enabled) {
            this.color1 = style.defaultColours[0];
        }

        if (this.colourCount > 1 && !this.color2Enabled) {
            this.color2 = style.defaultColours[1];
        }

        if (this.colourCount > 2 && !this.color3Enabled) {
            this.color3 = style.defaultColours[2];
        }

        this.busy = false;
    }

    styleChanged() {
        setTimeout(() => {
            this.configurationService.style = this.style.key;

            this.color1Enabled = false;
            this.color2Enabled = false;
            this.color3Enabled = false;

            this.configurationService.color1 = undefined;
            this.configurationService.color2 = undefined;
            this.configurationService.color3 = undefined;

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
            this.configurationService.strokeStyle = this.strokeStyle === 'CUSTOM' ? this.strokeColor : this.strokeStyle;
            this.configurationService.styleChanged('');
        }, 100);
    }

    onToggleColor1Enabled() {
        this.configurationService.color1 = this.color1Enabled ? this.color1 : undefined;
        this.configurationService.styleChanged('');
    }

    onToggleColor2Enabled() {
        this.configurationService.color2 = this.color2Enabled ? this.color2 : undefined;
        this.configurationService.styleChanged('');
    }

    onToggleColor3Enabled() {
        this.configurationService.color3 = this.color3Enabled ? this.color3 : undefined;
        this.configurationService.styleChanged('');
    }

    selectColor1(myEvent) {
        this.selectColor(myEvent, 'color1Changed', this.configurationService.color1);
    }

    selectColor2(myEvent) {
        this.selectColor(myEvent, 'color2Changed', this.configurationService.color2);
    }

    selectColor3(myEvent) {
        this.selectColor(myEvent, 'color3Changed', this.configurationService.color3);
    }

    selectStrokeColor(myEvent) {
        this.selectColor(myEvent, 'strokeColorChanged', this.strokeColor);
    }

    selectColor(myEvent, event, color) {
        const popover = this.popoverCtrl.create(ColorPicker, {
            eventName: event,
            color: color
        });
        popover.present({
            ev: myEvent
        });
    }
}
