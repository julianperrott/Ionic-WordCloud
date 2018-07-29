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
    color1;
    color2;
    color3;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        private events: Events,
        public viewController: ViewController,
        public styleFactory: StyleFactory
    ) {
        this.style = this.configurationService.style;
        this.color1Enabled = this.configurationService.color1;
        this.color2Enabled = this.configurationService.color2;
        this.color3Enabled = this.configurationService.color3;
        this.color1 = this.configurationService.color1;
        this.color2 = this.configurationService.color2;
        this.color3 = this.configurationService.color3;

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
    }

    styleChanged() {
        setTimeout(() => {
            this.configurationService.style = this.style.key;
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
