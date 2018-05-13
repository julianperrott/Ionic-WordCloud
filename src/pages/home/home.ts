import { Component } from '@angular/core';

import * as d3 from 'd3-selection';

import * as unfluff from 'unfluff';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    data = 'How the Word Cloud Generator Works The layout algorithm for positioning words without overlap is available on GitHub under an open source license as d3-cloud. Note that this is the only the layout algorithm and any code for converting text into words and rendering the final output requires additional development. As word placement can be quite slow for more than a few hundred words, the layout algorithm can be run asynchronously, with a configurable time step size. This makes it possible to animate words as they are placed without stuttering. It is recommended to always use a time step even without animations as it prevents the browser’s event loop from blocking while placing the words. The layout algorithm itself is incredibly simple. For each word, starting with the most “important”: Attempt to place the word at some starting point: usually near the middle, or somewhere on a central horizontal line. If the word intersects with any previously placed words, move it one step along an increasing spiral. Repeat until no intersections are found The hard part is making it perform efficiently! According to Jonathan Feinberg, Wordle uses a combination of hierarchical bounding boxes and quadtrees to achieve reasonable speeds. Glyphs in JavaScript There isn’t a way to retrieve precise glyph shapes via the DOM, except perhaps for SVG fonts. Instead, we draw each word to a hidden canvas element, and retrieve the pixel data. Retrieving the pixel data separately for each word is expensive, so we draw as many words as possible and then retrieve their pixels in a batch operation. Sprites and Masks My initial implementation performed collision detection using sprite masks. Once a word is placed, it doesnt move, so we can copy it to the appropriate position in a larger sprite representing the whole placement area.The advantage of this is that collision detection only involves comparing a candidate sprite with the relevant area of this larger sprite, rather than comparing with each previous word separately.Somewhat surprisingly, a simple low-level hack made a tremendous difference: when constructing the sprite I compressed blocks of 32 1-bit pixels into 32-bit integers, thus reducing the number of checks (and memory) by 32 times.In fact, this turned out to beat my hierarchical bounding box with quadtree implementation on everything I tried it on (even very large areas and font sizes). I think this is primarily because the sprite version only needs to perform a single collision test per candidate area, whereas the bounding box version has to compare with every other previously placed word that overlaps slightly with the candidate area.Another possibility would be to merge a word’s tree with a single large tree once it is placed. I think this operation would be fairly expensive though compared with the analagous sprite mask operation, which is essentially ORing a whole block.';

    ionViewDidLoad() {
        this.createCircles();

        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const requesturl = 'https://www.usatoday.com/story/news/world/2018/05/12/north-korea-nuclear-weapons-donald-trump-kim-jong-un-summit/602736002/';
        fetch(proxyurl + requesturl)
            .then(response => response.text())
            .then(text => {
                console.log(text);
                this.data = unfluff(text, 'en').text
            });
    }

    createCircles(): void {
        const jsonCircles = [
            { x_axis: 30, y_axis: 30, radius: 20, color: 'green' },
            { x_axis: 70, y_axis: 70, radius: 20, color: 'purple' },
            { x_axis: 110, y_axis: 100, radius: 20, color: 'red' }
        ];

        const svgContainer = d3
            .select('#circles')
            .append('svg')
            .attr('width', 300)
            .attr('height', 200)
            .style('border', '1px solid black');

        const circles = svgContainer
            .selectAll('circle')
            .data(jsonCircles)
            .enter()
            .append('circle');

        circles
            .attr('cx', d => d.x_axis)
            .attr('cy', d => d.y_axis)
            .attr('r', d => d.radius)
            .style('fill', d => d.color);
    }
}
