import { Events } from 'ionic-angular';
import { ConfigurationService,Shape } from '../../services/configuration.service';
import { Injectable, NgZone } from '@angular/core';
import { Event } from '../../services/event';

declare var d3: any;

@Injectable()
export class D3CloudFacade {
    d3cloud: any;

    useServer=true;

    constructor(private configurationService: ConfigurationService, private zone: NgZone, private events: Events) {
        this.d3cloud = d3.layout.cloud();
    }

    error(err) {
        if (err) {
            if (err.message) {
                console.log('error: ' + err.message);
                alert(err.message);
            } else {
                console.log('error: ' + err);
            }
        }
        this.configurationService.setError();
    }

    public populate(w, h, padding, data: any[], createShape: Function, drawWordCloud: Function) {
        data.forEach(d => (d.drawn = false));

        if (data.length === 0) {
            this.configurationService.setBusy(false);
        }

        this.events.publish(Event.PROGRESS_UPDATE, 0);

        if (this.useServer){
            this.renderUsingServer(w, h, padding, data, createShape, drawWordCloud);
        }
        else{
            this.renderUsingClient(w, h, padding, data, createShape, drawWordCloud);
        }
    }

    renderUsingServer(w, h, padding, data: any[], createShape: Function, drawWordCloud: Function) {

        var shapeOb = <Shape> createShape();

        var wordsPayload = {
            size: [w, h],
            padding: padding,
            font: this.configurationService.fontFace,
            words: data,
            shapeFilename: shapeOb.filename
        };

        (async () => {
            const rawResponse = await fetch('http://localhost:3000/CreateCloud', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wordsPayload)
            });
            const content = await rawResponse.json();

            console.log(content);

            content.forEach(w => {
                if (w.i || w.i === 0) {
                    var word = data[w.i];
                    if (word) {
                        word.x = w.x;
                        word.y = w.y;
                        word.rotate = w.rotate;
                    }
                }
            });

            console.log('End web call: ' + content.length);
            this.end(data, [], drawWordCloud);
            
            this.drawBackgroundAsSvg(createShape);
        })();
    }

    drawBackgroundAsSvg(createShape: Function) {
        var shapeOb = createShape();

        // read svg file and set colour
        var request = new XMLHttpRequest();
        request.addEventListener('load', (event:ProgressEvent) => {
        const target = <XMLHttpRequest> event.target;
          var response = target.responseText;
          var svgshape = response.replace('<path ', shapeOb.defs+'<g '+ shapeOb.attributes + '><path ').replace('</svg>','</g></svg>');
          console.log(svgshape);
          this.events.publish(Event.SHAPE_BACKGROUND_RENDER, svgshape);
        });

        // load svg from url
        request.open('GET', shapeOb.url);
        request.setRequestHeader('Content-Type', 'image/svg+xml');
        request.send();
      };

    renderUsingClient(w, h, padding, data: any[], createShape: Function, drawWordCloud: Function) {
        const fontWeight = 'bolder';
        const spiralType = 'archimedean';
        let cache = [];
        let lastProgress = 0;

        let startTime = performance.now();

        this.d3cloud
            .size([w, h])
            .words(data)
            .shape(createShape)
            .padding(padding)
            .rotate(() => (~~(Math.random() * 6) - 3) * 30)
            .font(this.configurationService.fontFace)
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
                            this.events.publish(Event.PROGRESS_UPDATE, newProgress);
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
                this.end(data, cache, drawWordCloud);
            })
            .start();
    }

    public end(data: any[], cache: any[], drawWordCloud: Function) {
        if (!this.d3cloud.cancelled) {
            // console.log('Duration: ' + (performance.now() - startTime) / 1000);
            this.events.publish(Event.PROGRESS_UPDATE, 100);

            const todo = data.filter(c => (c.drawn === false || c.drawn === undefined) && c.x !== undefined && c.y !== undefined);

            console.log('End todo: ' + todo.length);

            drawWordCloud(todo);
            drawWordCloud(cache);
            cache = [];

            setTimeout(() => {
                this.configurationService.setBusy(false);
                this.setBusy(false);
            }, 100);
        } else {
            this.events.publish(Event.REDRAW_WORDCLOUD, 'd3cloud cancelled');
        }
    }

    public redrawBackground(shape) {
        
        if (this.useServer){
            this.drawBackgroundAsSvg(() => shape);
        }
        else{
            this.d3cloud.shape(() => shape).redrawBackground();
        }
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
