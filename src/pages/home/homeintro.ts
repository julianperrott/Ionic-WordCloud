import introJs from 'intro.js';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeIntro {
    static options = {
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
                intro: '<b>Cloud shape ...</b><hr/> This button allows you to change the shape of the word cloud.',
                position: 'left'
            },
            {
                element: '#stylings',
                intro:
                    '<b>Options & Actions ...</b><hr/> This button allows you to change the style of the word cloud.<hr/>You can also take a screenshot which will appear in your pictures folder.',
                position: 'left'
            },
            {
                intro: '<b>Enjoy...</b> let me know what you think in the comments !',
                position: 'centre'
            }
        ]
    };

    showIntro(onComplete: Function) {
        const intro = introJs.introJs();
        intro.oncomplete(() => onComplete());
        intro.onskip(() => onComplete());
        intro.onbeforeexit(() => onComplete());

        intro.setOptions(HomeIntro.options);

        intro.start();
    }

    start(onComplete: Function) {
        setTimeout(() => {
            this.showIntro(onComplete);
        }, 1000);
    }
}
