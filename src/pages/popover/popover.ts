import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfigurationService } from '../../app/configuration.service';
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})
export class PopoverPage {
    themes = [];
    theme = {};
    localTheme = { fontScale: 0, fontFace: '' };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService
    ) {
        this.themes = ConfigurationService.themes;
        for (const property in ConfigurationService.settings) {
            this.localTheme[property] = ConfigurationService.settings[property];
        }
        this.themes
            .filter(t => t.name === ConfigurationService.settings.name)
            .forEach(t => (this.theme = t));
    }

    update() {
        for (const property in this.localTheme) {
            ConfigurationService.settings[property] = this.localTheme[property];
        }
        this.configurationService.configurationChanged('');
    }

    themeChanged() {
        for (const property in this.theme) {
            this.localTheme[property] = this.theme[property];
        }
        this.update();
    }

    smaller() {
        this.localTheme.fontScale *= 1.1;
        this.update();
    }

    bigger() {
        this.localTheme.fontScale /= 1.1;
        this.update();
    }

    screenshot() {
        this.configurationService.takeScreenshot('');
    }
}
