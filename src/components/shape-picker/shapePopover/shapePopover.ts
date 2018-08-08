import { Component } from '@angular/core';
import {
    NavController,
    NavParams,
    PopoverController,
    ViewController
} from 'ionic-angular';
import { ConfigurationService } from '../../../services/configuration.service';
import { Events } from 'ionic-angular';
import { StyleFactory } from '../../renderStyle/styleFactory';
import { Event } from '../../../services/event';

@Component({
    selector: 'page-popover',
    templateUrl: 'shapePopover.html'
})
export class ShapePopoverPage {
    themeChangeInProgress = false;
    readonly SHAPE_BACKGROUND_COLOR = Event.SHAPE_BACKGROUND_COLOR;
    readonly SHAPE_COLOR1_CHANGED = Event.SHAPE_COLOR1_CHANGED;
    readonly SHAPE_COLOR2_CHANGED = Event.SHAPE_COLOR2_CHANGED;
    readonly SHAPE_COLOR3_CHANGED = Event.SHAPE_COLOR3_CHANGED;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private configurationService: ConfigurationService,
        public popoverCtrl: PopoverController,
        private events: Events,
        public viewController: ViewController,
        public styleFactory: StyleFactory
    ) {
        events.subscribe(Event.SHAPE_BACKGROUND_COLOR, color => {
            this.configurationService.shapeBackgroundColor = color;
        });

        events.subscribe(Event.SHAPE_COLOR1_CHANGED, color => {
            this.setShapeColor(0, color);
        });
        events.subscribe(Event.SHAPE_COLOR2_CHANGED, color => {
            this.setShapeColor(1, color);
        });
        events.subscribe(Event.SHAPE_COLOR3_CHANGED, color => {
            this.setShapeColor(2, color);
        });
    }

    setShapeColor(i: number, color: string) {
        console.log('setShapeColor ' + i + ' ' + color);
        this.configurationService.shapeColors[i].color = color;
        this.events.publish(
            Event.SHAPE_BACKGROUND_COLOR,
            this.configurationService.shapeBackgroundColor
        );
    }

    update() {
        this.configurationService.configurationChanged('');
    }

    styleChanged() {
        setTimeout(() => {
            const style = this.styleFactory.getStyleByKey(
                this.configurationService.shapeStyleKey
            );
            this.configurationService.shapeColors = [];
            style.defaultColours.forEach((c, i) =>
                this.configurationService.shapeColors.push({
                    color: c,
                    index: i
                })
            );

            this.events.publish(
                Event.SHAPE_BACKGROUND_COLOR,
                this.configurationService.shapeBackgroundColor
            );
        }, 100);
    }
}
