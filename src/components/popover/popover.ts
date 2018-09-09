import { Component } from '@angular/core';
import {
    NavController,
    NavParams,
    Platform,
    PopoverController,
    ViewController
} from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { Events } from 'ionic-angular';
import { Event } from '../../services/event';

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})
export class PopoverPage {
    countStyle = '';
    isApp = false;
    BACKGROUND_COLOR = Event.BACKGROUND_COLOR;

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

        events.subscribe(Event.BACKGROUND_COLOR, color => {
            this.configurationService.backgroundColor = color;
        });

        this.isApp =
            platform.is('core') || platform.is('mobileweb') ? false : true;
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

    lightnessChanged() {
        this.configurationService.styleChanged('');
    }
}
