import { Component, Input, Renderer2, ViewChild } from '@angular/core';

import { Popover, PopoverController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

import { ColorPicker } from '../color-picker/color-picker';

import { ConfigurationService } from '../../services/configuration.service';

import { Events } from 'ionic-angular';

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

    backgroundColor: '#FF0000';

    constructor(
        private renderer: Renderer2,
        public popoverCtrl: PopoverController,
        configurationService: ConfigurationService,
        public events: Events
    ) {
        configurationService.busyChanged$.subscribe(v => {
            this.busy = configurationService.busy;
            this.error = configurationService.error;
        });

        configurationService.takeScreenshot$.subscribe(v => {
            this.popover.dismiss();
        });

        this.events.subscribe('bgColorChanged', (color) => {
            this.backgroundColor = color;
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
        this.popover = this.popoverCtrl.create(ColorPicker, {color: this.backgroundColor, eventName: 'bgColorChanged' });
        this.popover.present({
            ev: myEvent
        });
    }
}
