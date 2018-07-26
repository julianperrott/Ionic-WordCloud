import { Events } from 'ionic-angular';
import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable, NgZone } from '@angular/core';

declare var d3: any;

@Injectable()
export class D3CloudFacade {
    d3cloud: any;

    constructor(private configurationService: ConfigurationService, private zone: NgZone, private events: Events) {
        this.d3cloud = d3.layout.cloud();
    }

    public populate(w, h, padding, data: any[], createShape: Function, drawWordCloud: Function) {
        const fontWeight: string = this.configurationService.settings.fontWeight == null ? 'normal' : this.configurationService.settings.fontWeight;
        const spiralType: string = this.configurationService.settings.spiralType == null ? 'archimedean' : this.configurationService.settings.spiralType;

        data.forEach(d => (d.drawn = false));

        let cache = [];

        if (data.length === 0) {
            this.configurationService.setBusy(false);
        }

        this.events.publish('progressUpdate', 0);
        let lastProgress = 0;

        let startTime = performance.now();

        this.d3cloud
            .size([w, h])
            .words(data)
            .shape(createShape)
            .padding(padding)
            .rotate(() => (~~(Math.random() * 6) - 3) * 30)
            .font(this.configurationService.settings.fontFace)
            .fontWeight(fontWeight)
            .fontSize(d => d.size)
            .spiral(spiralType)
            .on('word', (c, i) => {
                if (!this.d3cloud.cancelled) {
                    const newProgress = Math.floor((i * 100) / data.length);

                    if (c) {
                        if (c.x !== undefined && c.y !== undefined) {
                            cache.push(c);
                        }
                    }

                    const refreshSeconds = 1;
                    const refreshNow = performance.now() - startTime > refreshSeconds * 1000 || newProgress - lastProgress > 5;

                    // refresh if more than n seconds have elapsed
                    if (refreshNow) {
                        const cacheCopy = cache;
                        cache = [];

                        this.zone.run(() => {
                            lastProgress = newProgress;
                            this.events.publish('progressUpdate', newProgress);
                            if (cacheCopy.length > 0) {
                                drawWordCloud(cacheCopy);
                            }
                        });

                        startTime = performance.now();
                    }

                    c.drawn = true;
                }
            })
            .on('end', () => {
                if (!this.d3cloud.cancelled) {
                    // console.log('Duration: ' + (performance.now() - startTime) / 1000);
                    this.events.publish('progressUpdate', 100);

                    const todo = data.filter(c => (c.drawn === false || c.drawn === undefined) && c.x !== undefined && c.y !== undefined);

                    console.log('End todo: ' + todo.length);

                    drawWordCloud(todo);
                    drawWordCloud(cache);
                    cache = [];

                    setTimeout(() => {
                        this.configurationService.setBusy(false);
                    }, 100);
                } else {
                    this.events.publish('redrawWordCloud', 'd3cloud cancelled');
                }
            })
            .start();
    }
    public redrawBackground(shape) {
        this.d3cloud.shape(() => shape).redrawBackground();
    }

    public isBusy(): boolean {
        return this.d3cloud.busy;
    }

    public setBusy(value: boolean) {
        this.d3cloud.busy = value;
    }

    public abort() {
        this.d3cloud.abort();
    }
}
