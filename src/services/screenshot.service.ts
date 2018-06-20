import { Screenshot } from '@ionic-native/screenshot';
import { Injectable } from '@angular/core';

@Injectable()
export class ScreenshotService {
    constructor(private screenshot: Screenshot) {}

    takeScreenshot(): void {
        setTimeout(() => {
            this.screenshot
                .save('jpg', 100, 'wordCloud_' + this.js_yyyy_mm_dd_hh_mm_ss())
                .then(res => {
                    alert('Image captured and put in Pictures folder.');
                }
            ).catch (err => {
                alert('Oops... ' + err);
             });
        }, 1000 );
    }

    js_yyyy_mm_dd_hh_mm_ss() {
        const now = new Date();
        const year = '' + now.getFullYear();
        let month = '' + (now.getMonth() + 1);
        if (month.length === 1) {
            month = '0' + month;
        }
        let day = '' + now.getDate();
        if (day.length === 1) {
            day = '0' + day;
        }
        let hour = '' + now.getHours();
        if (hour.length === 1) {
            hour = '0' + hour;
        }
        let minute = '' + now.getMinutes();
        if (minute.length === 1) {
            minute = '0' + minute;
        }
        let second = '' + now.getSeconds();
        if (second.length === 1) {
            second = '0' + second;
        }
        return year + month + day + '_' + hour + minute + second;
    }
}
