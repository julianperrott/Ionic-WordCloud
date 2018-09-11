import { Events } from 'ionic-angular';
import { ConfigurationService, Shape } from '../../services/configuration.service';
import { Injectable } from '@angular/core';
import { Event } from '../../services/event';

@Injectable()
export class D3CloudFacade {

    static urls = ['http://35.242.174.200:31560/', 'https://webwordcloudcontainer.azurewebsites.net/'];

    constructor(private configurationService: ConfigurationService, private events: Events) { }

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

        const request: RequestInit = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wordsPayload)
        };

        (async () => {
            for (let i = 0; i < D3CloudFacade.urls.length; i++) {
                try {
                    const rawResponse = await fetch(D3CloudFacade.urls[i] + 'CreateCloud', request);
                    const result = await rawResponse.json();
                    this.endRequest(result, data, drawWordCloud);

                    if (i > 0) {
                        // move the successful url to position 0
                        const url = D3CloudFacade.urls[i];
                        D3CloudFacade.urls.splice(i, 1);
                        D3CloudFacade.urls.unshift(url);
                        console.log('Url move to front: ' + D3CloudFacade.urls[0]);
                    }
                    break;
                } catch (error) {
                    console.log('Url failed: ' + D3CloudFacade.urls[i]);
                    console.log(error);
                }
            }
        })();
    }

    endRequest(result, data: any[], drawWordCloud: Function) {
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
