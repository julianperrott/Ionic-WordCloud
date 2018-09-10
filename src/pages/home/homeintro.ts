import introJs from 'intro.js';
import { Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { TypedOptions } from 'typed.js';
import { Event } from '../../services/event';

import Typed from 'typed.js';

@Injectable()
export class HomeIntro {
    createOptions() {
        const isApp = this.platform.is('core') || this.platform.is('mobileweb') ? false : true;

        let optionsInfo = '<b>Options & Actions ...</b><hr/> This button allows you to change some other properties of the word cloud.';
        if (isApp) {
            optionsInfo += '<hr/>You can also take a screenshot which will appear in your pictures folder.';
        }

        if (window.fetch === undefined) {
            return {
                steps: [
                    {
                        intro: '<b>Web Word Cloud ...</b> <hr/> Turn web pages into word clouds with ease !<hr/><div style="color:red">Sorry, your browser is <b>not currently supported.</b> Web Word Cloud works best on Chrome, Firefox, Edge and Safari.<div>',
                        position: 'centre'
                    }]};
        }

        return {
            steps: [
                {
                    
                    intro: '<b>Web Word Cloud ...</b> <hr/> Turn web pages into word clouds with ease !<hr/>Click <b><i>Next</i></b> to see how it works...',
                    position: 'left'
                },
                {
                    element: '.text-input',
                    intro: '<b>Web Page address</b><hr/>Simply type or paste a web page address in this text box !',
                    position: 'right'
                },
                {
                    intro:
                        '<b>The Word Cloud</b><hr/>The text will be extracted from the web page and a word cloud will be shown here.<hr/>If there is not a lot of text on the page, perhaps navigate to one of the links on the page. ',
                    position: 'centre'
                },
                {
                    element: '#step2',
                    intro: '<b>Page Links</b><hr/>Some web pages contain lots of links !<hr/>Click here to see them and choose one to navigate to.',
                    position: 'left'
                },
                {
                    element: '#fontFace',
                    intro: '<b>Font</b><hr/> This button allows you to select the font of the words in the word cloud. ',
                    position: 'left'
                },
                {
                    element: '#stylings',
                    intro: '<b>Word Style</b><hr/> This button allows you to change the style of the words in the word cloud.<hr/>',
                    position: 'left'
                },
                {
                    element: '#shape',
                    intro: '<b>Cloud shape</b><hr/> This button allows you to change the shape, colour and style of the word cloud. ',
                    position: 'left'
                },
                {
                    element: '#otherStyles',
                    intro: optionsInfo,
                    position: 'left'
                },
                {
                    intro: '<b>Enjoy.</b> let me know what you think in the comments !',
                    position: 'centre'
                }
            ]
        };
    }

    constructor(private platform: Platform, events: Events) {

        const intro = introJs.introJs();

        events.subscribe(Event.HELP_SHOW_MAIN, v => {
            switch (v) {
                case 'HOME':
                    this.showIntro(() => { });
                    return;
                case 'COLOR_PICKER':
                    intro.setOptions(this.showColorPickerHelp());
                    break;
                case 'STYLE_PICKER':
                    intro.setOptions(this.showStylePickerHelp());
                    break;
                case 'SHAPE_PICKER':
                    intro.setOptions(this.showShapePickerHelp());
                    break;
                case 'SHAPE_POPOVER':
                    intro.setOptions(this.showShapePopoverHelp());
                    break;
                case 'OPTIONS_ACTIONS':
                    intro.setOptions(this.showOptionsActionsHelp());
                    break;
                case 'FONT_PICKER':
                    intro.setOptions(this.showFontPickerHelp());
                    break;
            };

            intro.start();
        });
    }

    showColorPickerHelp() {
        return {
            steps: [
                {
                    element: '#canvaschooser',
                    intro: '<b>Colour Choice</b> <hr/> Select the colour from the bottom bar. ',
                    position: 'left'
                },
                {
                    element: '#canvaspalette',
                    intro: '<b>Colour Shade</b> <hr/> Choose the shade from the main bar.',
                    position: 'left'
                }] 
        };
    }

    showStylePickerHelp() {
        return {
            steps: [
                {
                    element: '#wordStyle',
                    intro: '<b>Word Style</b> <hr/> A number of styles for the words in your word cloud are available. Choose each one in turn to learn what it looks like.',
                    position: 'left'
                },
                {
                    element: '#wordOutline',
                    intro: '<b>Word Outline</b> <hr/> A lot of the word styles have an outline, the colour of the outline can also be selected.',
                    position: 'left'
                },
                {
                    intro: '<b>Word Style Colours</b> <hr/> Some styles also have colours which can also be chosen on the menu. The colours selectors will appear when available after selecting a style.',
                    position: 'left'
                }            ]
        };
    }

    showShapePickerHelp() {
        return {
            steps: [
                {
                    intro: '<b>Cloud Shape Picker</b> <hr/> If you would like your cloud to be a particular shape then choose from this menu of shapes.',
                    position: 'left'
                }, {
                    element: '#shapeStyles',
                    intro: '<b>Cloud Shape Options</b> <hr/> Click to select options related to the shape you have chosen.',
                    position: 'left'
                },]
        };
    }

    showShapePopoverHelp() {
        return {
            steps: [
                {
                    element: '#wordStyle',
                    intro: '<b>Shape Options</b> <hr/> A number of styles for the shape of your word cloud are available. Choose each one in turn to learn what it looks like.',
                    position: 'left'
                },
                {
                    intro: '<b>Shape Style Colours</b> <hr/> The colour of your shape can also be chosen.',
                    position: 'left'
                }]
        };
    }

    showOptionsActionsHelp() {
        return {
            steps: [
                {
                    element: '#fontScale',
                    intro: '<b>Font Scale</b> <hr/> Changing the scale of the font makes it easier for the words to fill a shape.',
                    position: 'left'
                },
                {
                    element: '#wordCount',
                    intro: '<b>Word Counting</b> <hr/> This alters how the word frequency affects the size of the words.',
                    position: 'left'
                },
                {
                    element: '#saturation',
                    intro: '<b>Saturation</b> <hr/> This control changes the colour Saturation of the words.',
                    position: 'left'
                }
                ,
                {
                    element: '#lightness',
                    intro: '<b>Lightness</b> <hr/> This control changes the colour lightness of the words.',
                    position: 'left'
                },
                {
                    element: '#background',
                    intro: '<b>Background</b> <hr/> Select the main background colour here.',
                    position: 'left'
                }
            ]
        };
    }

    showFontPickerHelp() {
        return {
            steps: [
                {
                    intro: '<b>Font Picker</b> <hr/> The font you choose in this menu will be used when drawing the word cloud.',
                    position: 'left'
                }]
        };
    }

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
