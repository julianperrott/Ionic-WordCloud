import { Component, Input, NgZone, Renderer2, ViewChild } from '@angular/core';

import { Events, Popover, PopoverController, ViewController } from 'ionic-angular';

import { ConfigurationService } from '../../services/configuration.service';
import { ShapePicker } from '../shape-picker/shape-picker';

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
    @Input() showMore: Function;

    defaultTitle = '?';

    busy = false;
    error = false;
    popover: Popover;
    shape: '';

    constructor(
        private renderer: Renderer2,
        public popoverCtrl: PopoverController,
        configurationService: ConfigurationService,
        zone: NgZone,
        events: Events,
        public viewController: ViewController
    ) {
        configurationService.busyChanged$.subscribe(v => {
            // console.log('Busy is now ' + configurationService.busy);
            zone.run(() => {
                this.busy = configurationService.busy;
                this.error = configurationService.error;
            });
        });

        configurationService.takeScreenshot$.subscribe(v => {
            try {
                this.popover.dismiss();
            } catch (err) {
                console.log(err);
            }
        });

        events.subscribe('shapeChanged', shape => {
            this.shape = shape;
        });
    }

    ngAfterViewInit() {
        const titleEl = this.refIonTitle.getElementRef().nativeElement.querySelector('.toolbar-title');
        if (titleEl.childNodes.length === 0) {
            this.renderer.appendChild(titleEl, this.renderer.createText(this.defaultTitle));
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
}
