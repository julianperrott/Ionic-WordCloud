import { Component, Input } from '@angular/core';
import { Events, PopoverController } from 'ionic-angular';
import { ColorPicker } from '../color-picker/color-picker';

@Component({
    selector: 'colorMenuItem',
    templateUrl: 'colorMenuItem.html'
})
export class ColorMenuItem {
    @Input() color: string;
    @Input() description: string;
    @Input() eventName: string

    subscribed = false;

    constructor(private popoverCtrl: PopoverController, private events: Events) { }

    selectColor(myEvent) {
        if (!this.subscribed) {
            this.subscribed = true;
            this.events.subscribe(this.eventName, color => {
                this.color = color;
            });
        }

        const popover = this.popoverCtrl.create(ColorPicker, {
            eventName: this.eventName,
            color: this.color
        });
        popover.present({
            ev: myEvent
        });
    }
}