import { Component } from '@angular/core';
import { NavController, NavParams, Platform, PopoverController, ViewController } from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { ColorPicker } from '../color-picker/color-picker';
import { Events } from 'ionic-angular';

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})
export class PopoverPage {
    countStyle = '';
    isApp = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        events: Events,
        public viewController: ViewController,
        platform: Platform
    ) {
        this.countStyle = configurationService.countStyle;

        events.subscribe('backgroundColour', color => {
            this.configurationService.backgroundColor = color;
        });

        this.isApp = platform.is('core') || platform.is('mobileweb') ? false : true;
    }

    fontChanged() {
        this.configurationService.fontChanged('');
    }

    countStyleChanged() {
        this.configurationService.countStyle = this.countStyle;
        this.configurationService.configurationChanged('');
    }

    sequence = 0;

    scaleChanged() {
        this.sequence++;
        setTimeout(
            cn => {
                if (cn === this.sequence) {
                    this.configurationService.configurationChanged('');
                }
            },
            1000,
            this.sequence
        );
    }

    screenshot() {
        this.configurationService.takeScreenshot('');
    }

    lightnessChanged(){
        this.configurationService.styleChanged('');
    }
}
