import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import * as unfluff from 'unfluff';

import { ConfigurationService } from '../../services/configuration.service';
import { HtmlToLinksService, Link } from '../../services/htmlToLinks.service';

import { ScreenshotService } from '../../services/screenshot.service';

import { Intro } from './intro';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Intro]
})
export class HomePage {
    @ViewChild(Content) content: Content;
    data = '';

    links: Link[];
    refreshLinks = false;

    url = '';
    lastUrl = '';
    showOnlyWordCloud = false;
    redrawOn = true;

    constructor(
        private configurationService: ConfigurationService,
        private htmlToLinksService: HtmlToLinksService,
        screenshot: ScreenshotService,
        private intro: Intro
    ) {
        this.links = configurationService.defaultLinks;

        configurationService.UrlChangeSource$.subscribe(v => {
            this.refreshLinks = true;
            this.url = configurationService.url;
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
        this.intro.start();
        setTimeout(() => {
            this.data = this.configurationService.defaultData + ' x';
        }, 5000);
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
}
