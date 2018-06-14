import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { Themes } from '../../theme/Themes';

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
    themeChangeInProgress = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService
    ) {
        this.themes = Themes.items;
        for (const property in configurationService.settings) {
            this.localTheme[property] = configurationService.settings[property];
        }
        this.themes
            .filter(t => t.name === configurationService.settings.name)
            .forEach(t => (this.theme = t));
    }

    update() {
        if (this.themeChangeInProgress) {
            return;
        }

        for (const property in this.localTheme) {
            this.configurationService.settings[property] = this.localTheme[
                property
            ];
        }
        this.configurationService.configurationChanged('');
    }

    themeChanged() {
        this.themeChangeInProgress = true;
        for (const property in this.theme) {
            this.localTheme[property] = this.theme[property];
        }

        setTimeout(() => {
            this.themeChangeInProgress = false;
            this.update();
        }, 100);
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
