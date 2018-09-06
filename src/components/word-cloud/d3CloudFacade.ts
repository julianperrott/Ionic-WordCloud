import { Events } from 'ionic-angular';
import { ConfigurationService, Shape } from '../../services/configuration.service';
import { Injectable } from '@angular/core';
import { Event } from '../../services/event';

@Injectable()
export class D3CloudFacade {
    constructor(private configurationService: ConfigurationService, private events: Events) {}

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

        const shapeOb = <Shape>createShape();
        this.drawBackgroundAsSvg(createShape);

        const wordsPayload = {
            size: [w, h],
            padding: padding,
            font: this.configurationService.fontFace,
            words: data,
            shapeFilename: shapeOb.filename
        };

        (async () => {
            // var containerUrl = 'https://webwordcloudcontainer.azurewebsites.net/';
            const googleUrl = 'http://35.197.199.55/';
            // var localUrl = 'http://localhost:3000/';
            const rawResponse = await fetch(googleUrl + 'CreateCloud', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wordsPayload)
            });
            const result = await rawResponse.json();

            const content = result.wordCloud;

            console.log(result);

            content.forEach(w => {
                if (w.i || w.i === 0) {
                    const word = data[w.i];
                    if (word) {
                        word.x = w.x;
                        word.y = w.y;
                        word.rotate = w.rotate;
                    }
                }
            });

            console.log('End web call: ' + content.length);
            this.end(data, [], drawWordCloud);
        })();
    }

    drawBackgroundAsSvg(createShape: Function) {
        const shapeOb = createShape();

        // read svg file and set colour
        const request = new XMLHttpRequest();
        request.addEventListener('load', (event: ProgressEvent) => {
            const target = <XMLHttpRequest>event.target;
            const response = target.responseText;
            const svgshape = response.replace('<path ', shapeOb.defs + '<g ' + shapeOb.attributes + '><path ').replace('</svg>', '</g></svg>');
            console.log(svgshape);
            this.events.publish(Event.SHAPE_BACKGROUND_RENDER, svgshape);
        });

        // load svg from url
        request.open('GET', shapeOb.url);
        request.setRequestHeader('Content-Type', 'image/svg+xml');
        request.send();
    }

    public end(data: any[], cache: any[], drawWordCloud: Function) {
        this.events.publish(Event.PROGRESS_UPDATE, 100);

        const todo = data.filter(c => (c.drawn === false || c.drawn === undefined) && c.x !== undefined && c.y !== undefined);

        console.log('End todo: ' + todo.length);

        drawWordCloud(todo);
        drawWordCloud(cache);
        cache = [];

        setTimeout(() => {
            this.configurationService.setBusy(false);
        }, 100);
    }

    public redrawBackground(shape) {
        this.drawBackgroundAsSvg(() => shape);
    }
}
