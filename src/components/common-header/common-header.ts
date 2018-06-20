import { Component, Input, NgZone, Renderer2, ViewChild } from '@angular/core';

import { Popover, PopoverController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'common-header',
    templateUrl: 'common-header.html'
})
export class CommonHeaderComponent {
    @ViewChild('ref') refIonTitle;
    @Input() showMenuButton;
    @Input() showMoreButton;

    defaultTitle = '?';

    busy = false;
    error = false;
    popover: Popover;

    constructor(
        private renderer: Renderer2,
        public popoverCtrl: PopoverController,
        configurationService: ConfigurationService,
        zone: NgZone
    ) {
        configurationService.busyChanged$.subscribe(v => {
            console.log('Busy is now ' + configurationService.busy);
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
        this.popover = this.popoverCtrl.create(PopoverPage);
        this.popover.present({
            ev: myEvent
        });
    }
}
