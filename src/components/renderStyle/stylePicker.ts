import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { Events } from 'ionic-angular';
import { StyleFactory } from '../renderStyle/styleFactory';

@Component({
    selector: 'page-popover',
    templateUrl: 'stylePicker.html'
})
export class StylePicker {
    public style;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        events: Events,
        public viewController: ViewController,
        public styleFactory: StyleFactory
    ) {
        this.style = this.configurationService.style;
    }

    styleChanged() {
        setTimeout(() => {
            this.configurationService.style = this.style.key;
            this.configurationService.styleChanged('');
        }, 100);
    }
}
