import { Component } from '@angular/core';
import {
    NavController,
    NavParams,
    Platform,
    PopoverController,
    ViewController
} from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { Themes } from '../../theme/Themes';
import { ColorPicker } from '../color-picker/color-picker';
import { Events } from 'ionic-angular';
import { ShapePicker } from '../shape-picker/shape-picker';

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})
export class PopoverPage {
    themes = [];
    theme = {};
    localTheme = { fontScale: 0, fontFace: '' };
    themeChangeInProgress = false;
    countStyle = '';
    scale = 0;
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
        this.themes = Themes.items;
        for (const property in configurationService.settings) {
            this.localTheme[property] = configurationService.settings[property];
        }
        this.scale = this.localTheme['fontScale'];

        this.themes
            .filter(t => t.name === configurationService.settings.name)
            .forEach(t => (this.theme = t));

        events.subscribe('backgroundColour', color => {
            this.configurationService.backgroundColor = color;
        });

        this.isApp =
            platform.is('core') || platform.is('mobileweb') ? false : true;
    }

    fontChanged() {
        if (this.themeChangeInProgress) {
            return;
        }

        this.configurationService.settings['fontFace'] = this.localTheme[
            'fontFace'
        ];
        this.configurationService.fontChanged('');
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

    countStyleChanged() {
        if (this.themeChangeInProgress) {
            return;
        }

        this.configurationService.countStyle = this.countStyle;
        this.configurationService.configurationChanged('');
    }

    themeChanged() {
        this.themeChangeInProgress = true;
        for (const property in this.theme) {
            this.localTheme[property] = this.theme[property];
        }

        this.scale = this.localTheme['fontScale'];

        setTimeout(() => {
            this.themeChangeInProgress = false;
            this.update();
        }, 100);
    }

    sequence = 0;

    scaleChanged() {
        if (this.themeChangeInProgress) {
            return;
        }

        this.localTheme['fontScale'] = this.scale;
        this.sequence++;
        setTimeout(
            cn => {
                if (cn === this.sequence) {
                    this.update();
                }
            },
            1000,
            this.sequence
        );
    }

    screenshot() {
        this.configurationService.takeScreenshot('');
    }

    cloudShape(myEvent) {
        if (this.themeChangeInProgress) {
            return;
        }

        this.viewController.dismiss();

        const popover = this.popoverCtrl.create(ShapePicker, {
            shape: this.configurationService.shape
        });
        popover.present({
            ev: myEvent
        });
    }

    selectBackgroundColour(myEvent) {
        if (this.themeChangeInProgress) {
            return;
        }

        this.viewController.dismiss();

        const popover = this.popoverCtrl.create(ColorPicker, {
            eventName: 'backgroundColour',
            color: this.configurationService.backgroundColor
        });
        popover.present({
            ev: myEvent
        });
    }
}
