import { Component, Input, Renderer2, ViewChild } from '@angular/core';

import { Popover, PopoverController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

import { ColorPicker } from '../color-picker/color-picker';

import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'common-header',
    templateUrl: 'common-header.html'
})
export class CommonHeaderComponent {
    @ViewChild('ref') refIonTitle;
    @Input() showButtons;

    defaultTitle = '?';

    busy = false;
    error = false;
    popover: Popover;

    constructor(
        private renderer: Renderer2,
        public popoverCtrl: PopoverController,
        configurationService: ConfigurationService
    ) {
        configurationService.busyChanged$.subscribe(v => {
            this.busy = configurationService.busy;
            this.error = configurationService.error;
        });

        configurationService.takeScreenshot$.subscribe(v => {
            this.popover.dismiss();
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
        this.popover = this.popoverCtrl.create(ColorPicker);
        this.popover.present({
            ev: myEvent
        });
    }
}
