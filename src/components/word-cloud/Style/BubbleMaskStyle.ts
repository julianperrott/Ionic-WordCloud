import { ConfigurationService } from '../../../services/configuration.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BubbleMaskStyle {
    constructor(private configurationService: ConfigurationService) {}

    svg: any;
    w:number;
    h:number;

    public initialise(svg: any, w: number, h: number) {
        this.svg = svg;
        this.h=h;
        this.w=w;

        const jsonCircles = [];

        for (let i = 0; i < 2000; i++) {
            let cx =  Math.floor(Math.random() * w - w / 2);
            let cy =  Math.floor(Math.random() * h - h / 2);
            jsonCircles.push({
                cx: cx,
                cy: cy,
                xOffset: cx,
                yOffset: cy,
                radius: Math.random() * (h > w ? w : h) * 0.02,
                opacity: Math.random() + 0.1,
                color: 'green',
                counter: Math.random()*360
            });
        }

        const circles = this.svg
            .selectAll('g')
            .data(jsonCircles)
            .enter()
            .append('circle');


            console.log(typeof circles);
            console.log(typeof circles[0]);
        circles
            .attr('cx', d => d.cx)
            .attr('cy', d => d.cy)
            .attr('r', d => d.radius)
            .attr('opacity', d => d.opacity)
            .style('fill', d => d.color);
            
            
            window.requestAnimationFrame(()=>this.redraw(circles));

            //this.redraw(circles);          
    }

    public redraw(circles){


        var increase = Math.PI * 2 /40;

        
        circles.attr('cx', d => {
              var x = (d.xOffset) + (50*(Math.sin(d.counter)) / 5);
              d.counter += increase;
              return x;
        })
        .attr('cy', d => {
            d.cy = d.cy < -this.h / 2 ? this.h/2 :  d.cy-2;
              return d.cy;
        });
        
        window.requestAnimationFrame(()=>this.redraw(circles));

        //setTimeout(() => this.redraw(circles), 200);      
    }

    public drawWordCloud(words) {
        const settings = this.configurationService.settings;

        //return;

        const enter = this.svg
            .selectAll('g')
            .data(words)
            .enter();

        enter
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('font-family', d => (d.fontFace = settings.fontFace))
            .style('fill', (d, i) => {
                return 'hsl(' + d.color * 360 + ',100%,' + settings.lightnessGlow + ')';
            })
            .attr('text-anchor', 'middle')
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .attr('filter', 'url(#glow)')
            .text(d => {
                return d.text;
            });

        enter
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('stroke', d => settings.strokeColour) // stroke colour
            .style('stroke-opacity', d => settings.strokeOpacity) //  stroke opacity
            .style('stroke-width', d => {
                let scale = ~~(d.size / settings.strokeScale);
                scale = scale < settings.strokeMinWidth ? settings.strokeMinWidth : scale;
                return scale + 'px';
            }) // stroke size divider + min width
            .style(
                'font-family',
                d => (d.fontFace = settings.fontFace) // font face
            )
            .style('fill', (d, i) => {
                return 'hsl(' + d.color * 360 + ',100%, ' + settings.lightness + ')';
            })
            .attr('text-anchor', 'middle')
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .text(d => {
                return d.text;
            });
    }
}
