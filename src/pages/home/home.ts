import { Component } from '@angular/core';

import * as d3 from 'd3-selection';

import * as unfluff from 'unfluff';

import introJs from '../../../node_modules/intro.js/intro.js';

import { ConfigurationService } from '../../app/configuration.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    data = 'How the Word Cloud Generator Works The layout algorithm for positioning page without overlap is available on GitHub under an open source license as d3-cloud. Note that this is the only the layout algorithm and any code for converting text into page and rendering the final output requires additional development. As word placement can be quite slow for more than a few hundred page, the layout algorithm can be run asynchronously, with a configurable time step size. This makes it possible to animate page as they are placed without stuttering. It is recommended to always use a time step even without animations as it prevents the browser’s event loop from blocking while placing the page. The layout algorithm itself is incredibly simple. For each word, starting with the most “important”: Attempt to place the word at some starting point: usually near the middle, or somewhere on a central horizontal line. If the word intersects with any previously placed page, move it one step along an increasing spiral. Repeat until no intersections are found The hard part is making it perform efficiently! According to Jonathan Feinberg, Wordle uses a combination of hierarchical bounding boxes and quadtrees to achieve reasonable speeds. Glyphs in JavaScript There isn’t a way to retrieve precise glyph shapes via the DOM, except perhaps for SVG fonts. Instead, we draw each word to a hidden canvas element, and retrieve the pixel data. Retrieving the pixel data separately for each word is expensive, so we draw as many page as possible and then retrieve their pixels in a batch operation. clouds and Masks My initial implementation performed collision detection using cloud masks. Once a word is placed, it doesnt move, so we can copy it to the appropriate position in a larger cloud representing the whole placement area.The advantage of this is that collision detection only involves comparing a candidate cloud with the relevant area of this larger cloud, rather than comparing with each previous word separately.Somewhat surprisingly, a simple low-level hack made a tremendous difference: when constructing the cloud I compressed blocks of 32 1-bit pixels into 32-bit integers, thus reducing the number of checks (and memory) by 32 times.In fact, this turned out to beat my hierarchical bounding box with quadtree implementation on everything I tried it on (even very large areas and font sizes). I think this is primarily because the cloud version only needs to perform a single collision test per candidate area, whereas the bounding box version has to compare with every other previously placed word that overlaps slightly with the candidate area.Another possibility would be to merge a word’s tree with a single large tree once it is placed. I think this operation would be fairly expensive though compared with the analagous cloud mask operation, which is essentially ORing a whole block.';

    url = 'http://www.capita.com/about-us/case-studies/how-we-helped-a-council-to-help-children-and-families/';

    constructor(private configurationService: ConfigurationService) {
    }

    ionViewDidLoad() {
        this.refresh();
        this.url="";
        this.intro();
    }

    error(err){
        alert("error caught: " +err);
        console.log(err);
    }


    characterNumber = 0;

    update(){
        this.characterNumber++;
        setTimeout( (cn) => {
            console.log(cn);
            if (cn == this.characterNumber){
                this.refresh();   
            }
        },1000,this.characterNumber);
    }

    refresh(){
        if(this.url.length<5){
            this.configurationService.setBusy(false);
            return;
        }

        this.configurationService.setBusy(true);

        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyurl + this.url)
            .then(response => response.text(), this.error)
            .then(text => {
                console.log(text);
                this.data = unfluff(text, 'en').text
                if(this.data.length==0){
                    console.log(text);
                    this.configurationService.setError();
                }
            }, this.error)
            .catch(this.error);
      }

      intro() {
        let intro = introJs.introJs();
        intro.setOptions({
        steps: [
          {
            intro: "Welcome to the App Tour !",
          },
          {
            element: '.text-input',
            intro: "Put a web page URL here.",
            position: 'bottom'
          },
          {
            intro: "A word cloud for the page will show here.",
            position: 'centre'
          },
          {
            element: '#stylings',
            intro: "Click here to change the style of the word cloud.",
            position: 'bottom'
          },
          {
            intro: "Enjoy !",
            position: 'centre'
          },
        ]
        });
        intro.start();
      }
}
