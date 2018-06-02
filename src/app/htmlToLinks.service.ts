import { Injectable } from '@angular/core';

import { DefaultHandler, Parser, Tag } from 'htmlparser';

export interface Link {
    href: string;
    text: string;
    depth: number;
}

@Injectable()
export class HtmlToLinksService {
    links: Link[] = [];

    parseHtml(html: string): Link[] {
        this.links = [];

        const handler = new DefaultHandler((error, dom) => {
            if (error) {
                alert('error');
            } else {
                this.extractLinks(dom as [Tag], 0);
            }
        }, undefined);
        const parser = new Parser(handler, undefined);
        parser.parseComplete(html);

        return this.links;
    }

    extractLinks(html: Tag[], depth: number) {
        html.forEach(tag => {
            if (
                tag.type === 'tag' &&
                tag.name === 'a' &&
                tag.attribs &&
                tag.attribs['href']
            ) {
                const href = tag.attribs['href'];
                const illegalStartCount = ['#', 'sms:', 'mailto'].filter(f =>
                    href.startsWith(f)
                ).length;

                if (tag.children && illegalStartCount === 0) {
                    let text = this.extractText(tag.children);
                    if (text.length === 0) {
                        text = href;
                    }
                    this.links.push({ href, text, depth });
                }
            }
            if (tag.children) {
                this.extractLinks(tag.children, depth + 1);
            }
        });
    }

    extractText(html: [Tag]): string {
        let text = '';
        html.forEach(tag => {
            const add =
                tag.type === 'text'
                    ? tag.data.trim()
                    : tag.children
                        ? this.extractText(tag.children)
                        : '';
            if (add.length > 0) {
                text += (text.length > 0 ? ' / ' : '') + add;
            }
        });

        return text;
    }
}
