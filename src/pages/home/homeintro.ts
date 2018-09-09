import introJs from 'intro.js';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TypedOptions } from 'typed.js';

import Typed from 'typed.js';

@Injectable()
export class HomeIntro {
    createOptions() {
        const isApp = this.platform.is('core') || this.platform.is('mobileweb') ? false : true;

        let optionsInfo = '<b>Options & Actions ...</b><hr/> This button allows you to change the font of the word cloud, plus some other properties.';
        if (isApp) {
            optionsInfo += '<hr/>You can also take a screenshot which will appear in your pictures folder.';
        }

        if (window.fetch === undefined) {
            return {
                steps: [
                    {
                        element: '#cloud',
                        intro: '<b>Web Word Cloud ...</b> <hr/> Turn web pages into word clouds with ease !<hr/><div style="color:red">Sorry, your browser is <b>not currently supported.</b> Web Word Cloud works best on Chrome, Firefox, Edge and Safari.<div>',
                        position: 'centre'
                    }]};
        }

        return {
            steps: [
                {
                    element: '#cloud',
                    intro: '<b>Web Word Cloud ...</b> <hr/> Turn web pages into word clouds with ease !<hr/>Click <b><i>Next</i></b> to see how it works...',
                    position: 'left'
                },
                {
                    element: '.text-input',
                    intro: '<b>Web Page address ...</b><hr/>Simply type or paste a web page address in this text box !',
                    position: 'right'
                },
                {
                    element: '#cloud',
                    intro:
                        '<b>The Word Cloud ...</b><hr/>The text will be extracted from the web page and a word cloud will be shown here.<hr/>If there is not a lot of text on the page, perhaps navigate to one of the links on the page. ',
                    position: 'centre'
                },
                {
                    element: '#step2',
                    intro: '<b>Page Links ...</b><hr/>Some web pages contain lots of links !<hr/>Click here to see them and choose one to navigate to.',
                    position: 'left'
                },
                {
                    element: '#shape',
                    intro: '<b>Cloud shape ...</b><hr/> This button allows you to change the shape, colour and style of the word cloud. ',
                    position: 'left'
                },
                {
                    element: '#stylings',
                    intro: '<b>Word Style ...</b><hr/> This button allows you to change the style of the words in the word cloud.<hr/>',
                    position: 'left'
                },
                {
                    element: '#otherstyles',
                    intro: optionsInfo,
                    position: 'left'
                },
                {
                    intro: '<b>Enjoy...</b> let me know what you think in the comments !',
                    position: 'centre'
                }
            ]
        };
    }

    constructor(private platform: Platform) {}

    showIntro(onComplete: Function) {

        const options: TypedOptions = {
            strings: ['url', 'www.bbc.co.uk/news^1000', 'en.wikipedia.org/wiki/Cheese^1000', 'www.vogue.co.uk/topic/fashion^1000', 'www.ferrari.com/en-EN/articles/ferrari-488-pista-spider^1000'],
            typeSpeed: 50,
            backSpeed: 0,
            attr: 'placeholder',
            bindInputFocusEvents: true,
            loop: true
        };


        let typed = new Typed('input', options );

        const complete = () => {
            typed.stop();
            typed.destroy();

            options.strings = ['Enter or paste a URL here ! ^5000'];
            typed = new Typed('input', options);
            typed.start();
            

            onComplete();
        };

        const intro = introJs.introJs();
        intro.oncomplete(() => complete());
        intro.onskip(() => complete());
        intro.onbeforeexit(() => complete());

        intro.setOptions(this.createOptions());

        intro.start();
    }

    start(onComplete: Function) {
        setTimeout(() => {
            this.showIntro(onComplete);
        }, 1000);
    }
}
