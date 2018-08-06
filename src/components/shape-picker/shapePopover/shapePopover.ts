import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { ConfigurationService } from '../../../services/configuration.service';
import { ColorPicker } from '../../color-picker/color-picker';
import { Events } from 'ionic-angular';
import { StyleFactory } from '../../renderStyle/styleFactory';

@Component({
    selector: 'page-popover',
    templateUrl: 'shapePopover.html'
})
export class ShapePopoverPage {
    themeChangeInProgress = false;
    backgroundVisibility = true;
    public style;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        private events: Events,
        public viewController: ViewController,
        public styleFactory: StyleFactory
    ) {
        events.subscribe('shapeBackgroundColour', color => {
            this.configurationService.shapeBackgroundColor = color;
        });

        events.subscribe('shapeColor1Changed', color => { this.setShapeColor(0, color); });
        events.subscribe('shapeColor2Changed', color => { this.setShapeColor(1, color); });
        events.subscribe('shapeColor3Changed', color => { this.setShapeColor(2, color); });

        this.backgroundVisibility = this.configurationService.showShapeBackground;
    }

    setShapeColor(i: number, color: string) {
        this.configurationService.shapeColors[i].color = color;
        this.events.publish('shapeBackgroundColour', this.configurationService.shape);
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

    styleChanged() {
        setTimeout(() => {
            this.configurationService.shapeStyle = this.style.key;

            const style = this.styleFactory.getStyleByKey(this.style.key);
            this.configurationService.shapeColors = [];
            style.defaultColours.forEach((c, i) => this.configurationService.shapeColors.push({ color: c, index: i }));

            this.events.publish('shapeChanged', this.configurationService.shape);
        }, 100);
    }
}
