import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class WordsToCountService {
    text: string[];

    constructor(private configurationService: ConfigurationService) {}

    count(words: string) {
        const ignoreWords = this.configurationService.ignoreWords.split(',');

        return this.countWords(words, ignoreWords, 4);
    }

    private countWords(
        wordData,
        ignoreWords: string[],
        minWordLength: number
    ): any {
        const counts = wordData
            .split(/[&\r\n'’"“”:;() ,.#]+/)
            .map(word => word.toLowerCase().trim())
            .filter(
                word =>
                    ignoreWords.indexOf(word) === -1 &&
                    word.length >= minWordLength
            )
            .reduce((count, word) => {
                count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
                return count;
            }, {});

        const items = Object.keys(counts)
            .map(key => {
                return {
                    text: key,
                    size: counts[key]
                };
            })
            .sort((a, b) => (a.size === b.size ? 0 : a.size > b.size ? -1 : 1));

        if (this.configurationService.countStyle === 'BANDING') {
            const wordSizes = [24, 18, 15, 10, 8, 6, 4, 3, 2];
            const capacity = [1, 2, 4, 8, 16, 32, 64, 128];

            let itemsInBand = 0;
            let band = 0;
            const scale = 256 / items.length;
            console.log('scale: ' + scale + ', items: ' + items.length);

            items.forEach(e => {
                if (itemsInBand >= capacity[band]) {
                    itemsInBand = 0;
                    band++;
                }
                e.size = wordSizes[band];
                itemsInBand += scale;

                // console.log(e.text + ' = ' + e.size);
            });
        }

        return items;
    }
}
