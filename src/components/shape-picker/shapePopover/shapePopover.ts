import { Component } from '@angular/core';
import {
    NavController,
    NavParams,
    Platform,
    PopoverController,
    ViewController
} from 'ionic-angular';

import { ConfigurationService } from '../../../services/configuration.service';
import { ColorPicker } from '../../color-picker/color-picker';
import { Events } from 'ionic-angular';

@Component({
    selector: 'page-popover',
    templateUrl: 'shapePopover.html'
})
export class ShapePopoverPage {
    themeChangeInProgress = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        events: Events,
        public viewController: ViewController,
        platform: Platform
    ) {
        events.subscribe('shapeBackgroundColour', color => {
            this.configurationService.shapeBackgroundColor = color;
        });
    }

    update() {
        this.configurationService.configurationChanged('');
    }

    selectBackgroundColour(myEvent) {
        if (this.themeChangeInProgress) {
            return;
        }

        this.viewController.dismiss();

        const popover = this.popoverCtrl.create(ColorPicker, {
            eventName: 'shapeBackgroundColour',
            color: this.configurationService.shapeBackgroundColor
        });
        popover.present({
            ev: myEvent
        });
    }
}
