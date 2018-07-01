import { Component, ViewChild } from '@angular/core';
import { Content, Events, ToastController } from 'ionic-angular';

import * as unfluff from 'unfluff';

import { ConfigurationService } from '../../services/configuration.service';
import { HtmlToLinksService, Link } from '../../services/htmlToLinks.service';
import { HtmlToTextService } from '../../services/htmlToText.service';
import { WordsToCountService } from '../../services/wordsToCountService';

import { ScreenshotService } from '../../services/screenshot.service';

import { HomeIntro } from './HomeIntro';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [HomeIntro]
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
    backgroundColor = '#000000';

    constructor(
        private configurationService: ConfigurationService,
        private htmlToLinksService: HtmlToLinksService,
        private htmlToTextService: HtmlToTextService,
        screenshot: ScreenshotService,
        private intro: HomeIntro,
        events: Events,
        private toastCtrl: ToastController,
        private wordsToCountService: WordsToCountService
    ) {
        this.links = configurationService.defaultLinks;

        configurationService.UrlChangeSource$.subscribe(v => {
            this.refreshLinks = true;
            this.url = configurationService.url;
            if (this.content != null) {
                this.content.scrollToTop();
            }
            this.redrawOn = false;
            this.refresh();
        });

        configurationService.takeScreenshot$.subscribe(v => {
            this.showOnlyWordCloud = true;
            screenshot.takeScreenshot();

            setTimeout(() => {
                this.showOnlyWordCloud = false;
            }, 2000);
        });

        events.subscribe('backgroundColour', color => {
            this.backgroundColor = color;
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
                // console.log(cn);
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

        fetch(proxyurl + this.url, {
            mode: 'no-cors'
        })
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
        let newData = unfluff(html, 'en').text;

        console.log('Data: ' + newData.length + ',' + newData);

        let words = this.wordsToCountService.count('Data: ' + newData);
        console.log('distinct words: ' + words.length);

        if (words.length < 70) {
            newData = this.htmlToTextService.parseHtml(html);
            words = this.wordsToCountService.count(newData);

            this.toastCtrl
                .create({
                    message:
                        'Using all ' + words.length + ' words on the page.',
                    duration: 10000,
                    position: 'bottom',
                    cssClass: 'toastSuccess'
                })
                .present();
        } else {
            this.toastCtrl
                .create({
                    message: 'Using article of ' + words.length + ' words.',
                    duration: 10000,
                    position: 'bottom',
                    cssClass: 'toastSuccess'
                })
                .present();
        }

        if (this.data === newData) {
            this.configurationService.setBusy(false);
        }

        this.data = newData;
    }
}
