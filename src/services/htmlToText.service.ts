import { Injectable } from '@angular/core';
import { DefaultHandler, Parser, Tag } from 'htmlparser';

@Injectable()
export class HtmlToTextService {
    text: string[];

    parseHtml(html: string): string {
        this.text = [];

        const handler = new DefaultHandler((error, dom) => {
            if (error) {
                alert('error');
            } else {
                this.extractText(dom as [Tag]);
            }
        }, undefined);
        const parser = new Parser(handler, undefined);
        parser.parseComplete(html);

        return this.text.join(' ');
    }

    extractText(html: [Tag]) {
        html.forEach(tag => {
            if (tag.type === 'text' && tag.data && tag.data.trim().length > 0) {
                const t = tag.data
                    .trim()
                    .replace('&#x27', ' ')
                    .replace('&#x', ' ');

                this.text.push(t);
                // console.log(t);
            } else {
                if (
                    ['script', 'style', 'div', 'tag'].indexOf(tag.type) === -1
                ) {
                    // console.log('Not text: ' + tag.type + ' ' + tag.name);
                }
            }
            if (tag.children && ['script', 'style'].indexOf(tag.type) === -1) {
                this.extractText(tag.children);
            }
        });
    }
}
