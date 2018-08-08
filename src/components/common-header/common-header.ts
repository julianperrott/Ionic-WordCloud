import { Component, Input, NgZone, Renderer2, ViewChild } from '@angular/core';

import {
    Events,
    Popover,
    PopoverController,
    ViewController
} from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { ShapePicker } from '../shape-picker/shape-picker';
import { StylePicker } from '../renderStyle/stylePicker';
import { Event } from '../../services/event';

@Component({
    selector: 'common-header',
    templateUrl: 'common-header.html'
})
export class CommonHeaderComponent {
    @ViewChild('ref') refIonTitle;
    @Input() showMenuButton;
    @Input() showMoreButton;
    @Input() showCloseButton;
    @Input() showShapeButton;
    @Input() showStyleButton;
    @Input() showMore: Function;

    defaultTitle = '?';

    busy = false;
    error = false;
    popover: Popover;
    shape = '';

    constructor(
        private renderer: Renderer2,
        public popoverCtrl: PopoverController,
        configurationService: ConfigurationService,
        zone: NgZone,
        events: Events,
        public viewController: ViewController
    ) {
        events.subscribe(Event.BUSY_CHANGED, v => {
            // console.log('Busy is now ' + configurationService.busy);
            zone.run(() => {
                this.busy = configurationService.busy;
                this.error = configurationService.error;
            });
        });

        events.subscribe(Event.TAKE_SCREENSHOT, v => {
            try {
                this.popover.dismiss();
            } catch (err) {
                console.log(err);
            }
        });

        this.shape = configurationService.shape;

        events.subscribe(Event.SHAPE_CHANGED, shape => {
            this.shape = shape;
        });
    }

    ngAfterViewInit() {
        const titleEl = this.refIonTitle
            .getElementRef()
            .nativeElement.querySelector('.toolbar-title');
        if (titleEl.childNodes.length === 0) {
            this.renderer.appendChild(
                titleEl,
                this.renderer.createText(this.defaultTitle)
            );
        }
    }

    presentPopover(myEvent) {
        this.popover = this.showMore();
        this.popover.present({
            ev: myEvent
        });
    }

    cloudShape(myEvent) {
        const popover = this.popoverCtrl.create(ShapePicker, {
            shape: this.shape
        });
        popover.present({
            ev: myEvent
        });
    }

    closePopover() {
        this.viewController.dismiss();
    }

    cloudStyle(myEvent) {
        const popover = this.popoverCtrl.create(StylePicker, {});
        popover.present({
            ev: myEvent
        });
    }
}
