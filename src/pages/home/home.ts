import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import * as unfluff from 'unfluff';

import introJs from '../../../node_modules/intro.js/intro.js';

import { ConfigurationService } from '../../app/configuration.service';
import { HtmlToLinksService, Link } from '../../app/htmlToLinks.service';

import { ScreenshotService } from '../../app/screenshot.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Content) content: Content;
    data = '';

    links: Link[] = [
        { href: 'https://www.bbc.co.uk/news', text: 'BBC News' } as Link,
        { href: 'https://www.bbc.co.uk/sport', text: 'BBC Sport' } as Link,
        { href: 'https://uk.reuters.com/', text: 'Reuters Uk' } as Link,
        { href: 'https://edition.cnn.com/', text: 'CNN' } as Link
    ];
    refreshLinks = false;

    url = '';
    lastUrl = '';
    showOnlyWordCloud = false;
    redrawOn = true;

    constructor(
        private configurationService: ConfigurationService,
        private htmlToLinksService: HtmlToLinksService,
        screenshot: ScreenshotService
    ) {
        configurationService.UrlChangeSource$.subscribe(v => {
            this.refreshLinks = true;
            this.url = ConfigurationService.url;
            this.content.scrollToTop();
            this.redrawOn = false;
            this.refresh();
        });

        configurationService.takeScreenshot$.subscribe(v => {
            this.showOnlyWordCloud = true;
            screenshot.takeScreenshot();
        });
    }

    ionViewDidLoad() {
        this.intro();
        setTimeout(() => {
            this.data =
                'Page Web Web Web Web Web Web Web Web Cloud How the Word Cloud Generator Works The layout algorithm for positioning page without overlap is available on GitHub under an open source license as d3-cloud. Note that this is the only the layout algorithm and any code for converting text into page and rendering the final output requires additional development. As word placement can be quite slow for more than a few hundred page, the layout algorithm can be run asynchronously, with a configurable time step size. This makes it possible to animate page as they are placed without stuttering. It is recommended to always use a time step even without animations as it prevents the browser’s event loop from blocking while placing the page. The layout algorithm itself is incredibly simple. For each word, starting with the most “important”: Attempt to place the word at some starting point: usually near the middle, or somewhere on a central horizontal line. If the word intersects with any previously placed page, move it one step along an increasing spiral. Repeat until no intersections are found The hard part is making it perform efficiently! According to Jonathan Feinberg, Wordle uses a combination of hierarchical bounding boxes and quadtrees to achieve reasonable speeds. Glyphs in JavaScript There isn’t a way to retrieve precise glyph shapes via the DOM, except perhaps for SVG fonts. Instead, we draw each word to a hidden canvas element, and retrieve the pixel data. Retrieving the pixel data separately for each word is expensive, so we draw as many page as possible and then retrieve their pixels in a batch operation. clouds and Masks My initial implementation performed collision detection using cloud masks. Once a word is placed, it doesnt move, so we can copy it to the appropriate position in a larger cloud representing the whole placement area.The advantage of this is that collision detection only involves comparing a candidate cloud with the relevant area of this larger cloud, rather than comparing with each previous word separately.Somewhat surprisingly, a simple low-level hack made a tremendous difference: when constructing the cloud I compressed blocks of 32 1-bit pixels into 32-bit integers, thus reducing the number of checks (and memory) by 32 times.In fact, this turned out to beat my hierarchical bounding box with quadtree implementation on everything I tried it on (even very large areas and font sizes). I think this is primarily because the cloud version only needs to perform a single collision test per candidate area, whereas the bounding box version has to compare with every other previously placed word that overlaps slightly with the candidate area.Another possibility would be to merge a word’s tree with a single large tree once it is placed. I think this operation would be fairly expensive though compared with the analagous cloud mask operation, which is essentially ORing a whole block.';
                this.redrawOnTimer(3000);
        }, 1);
    }

    redrawOnTimer(timeout) {
        setTimeout(() => {
            this.data = this.data + ' x';
            // this.redrawOnTimer(timeout);
        }, timeout);
    }

    error(err) {
        if (err) {
            if (err.message) {
                console.log('error: ' + err.message);
                alert(err.message);
                this.data = '' + err;
            } else {
                console.log('error: ' + err);
                this.data = 'Opps';
            }
        }
        this.configurationService.setError();
    }

    sequence = 0;

    update() {
        this.sequence++;
        setTimeout(
            cn => {
                console.log(cn);
                if (cn === this.sequence) {
                    this.refresh();
                }
            },
            1000,
            this.sequence
        );
    }

    refresh() {
        this.configurationService.clearError();

        if (this.url.length < 5) {
            this.configurationService.setBusy(false);
            return;
        }

        if (this.url === this.lastUrl) {
            return;
        }
        this.lastUrl = this.url;

        this.configurationService.setBusy(true);

        const proxyurl = 'https://cors-anywhere.herokuapp.com/';

        console.log('fetch: ' + this.url);

        fetch(proxyurl + this.url)
            .then(response => response.text(), err => this.error)
            .then(text => this.handleHtml('' + text), err => this.error)
            .catch(err => this.error);
    }

    handleHtml(html: string): void {
        if (this.refreshLinks) {
            this.links = this.htmlToLinksService.parseHtml(this.url, '' + html);
        }
        this.refreshLinks = true;

        this.handleWordData('' + html);
    }

    handleWordData(html: string): void {
        console.log('text length: ' + html.length);
        const newData = unfluff(html, 'en').text;
        if (newData.length === 0) {
            console.log(html);
            this.configurationService.setError();
            this.data = '' + html;
            return;
        }

        if (this.data === newData) {
            this.configurationService.setBusy(false);
        }

        this.data = newData;
    }

    intro() {
        const intro = introJs.introJs();
        intro.setOptions({
            steps: [
                {
                    intro:
                        '<b>Welcome to the App !</b> <hr/> Click <b><i>Next</i></b> to learn what you can do with it ...'
                },
                {
                    element: '.text-input',
                    intro:
                        '<b>Web Page address ...</b><hr/>Simply type or paste a web page address in this text box !',
                    position: 'bottom'
                },
                {
                    intro:
                        '<b>The Word Cloud ...</b><hr/>The word cloud for the page will show here.<hr/>If there is not a lot of text on the page, perhaps navigate to one of the links on the page. ',
                    position: 'centre'
                },
                {
                    element: '#step2',
                    intro:
                        '<b>Page Links ...</b><hr/>Some web pages contain lots of links.<hr/>Click here to see them and choose one to navigate to.',
                    position: 'bottom'
                },
                {
                    element: '#stylings',
                    intro:
                        '<b>Options & Actions ...</b><hr/> Click here to change the style of the word cloud.<hr/>You can also take a screenshot which will be put in your pictures folder.',
                    position: 'bottom'
                },
                {
                    intro:
                        '<b>Enjoy...</b> let me know what you think in the comments !',
                    position: 'centre'
                }
            ]
        });
        intro.start();
    }
}
