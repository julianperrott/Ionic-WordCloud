import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';

import { ConfigurationService } from '../../../services/configuration.service';
import { ColorPicker } from '../../color-picker/color-picker';
import { Events } from 'ionic-angular';

@Component({
    selector: 'page-popover',
    templateUrl: 'shapePopover.html'
})
export class ShapePopoverPage {
    themeChangeInProgress = false;
    backgroundVisibility = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        private events: Events,
        public viewController: ViewController
    ) {
        events.subscribe('shapeBackgroundColour', color => {
            this.configurationService.shapeBackgroundColor = color;
        });

        this.backgroundVisibility = this.configurationService.showShapeBackground;
    }

    update() {
        this.configurationService.configurationChanged('');
    }

    onToggleBackgroundVisibility() {
        this.configurationService.showShapeBackground = this.backgroundVisibility;
        this.events.publish('shapeBackgroundVisibility', this.backgroundVisibility);
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
