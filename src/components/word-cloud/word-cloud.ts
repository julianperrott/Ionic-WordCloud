import { Component, Input, OnChanges } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationService } from '../../app/configuration.service';

import * as D3 from 'd3';

// import * as canvg from 'canvg';

declare var d3: any;

@Component({
    selector: 'word-cloud',
    templateUrl: 'word-cloud.html',
    providers: [ConfigurationService]
})
export class WordCloudComponent implements OnChanges {
    @Input() wordData;
    lastdata = '';
    data = [];
    words = 'Hello';

    private svg; // SVG in which we will print our chart
    private margin: {
        // Space between the svg borders and the actual chart graphic
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    private width: number; // Component width
    private height: number; // Component height
    tempData = [];

    constructor(
        private configurationService: ConfigurationService,
        private splashScreen: SplashScreen,
        private platform: Platform
    ) {
        configurationService.configurationChanged$.subscribe(v => {
            this.lastdata = '';
            this.ngOnChanges();
        });
    }

    downloadAsSvg() {
        const link = document.createElement('a');
        link.href =
            'data:application/octet-stream;base64,' +
            btoa(D3.select('div.word-cloud').html());
        link.download = 'viz.svg';
        document.body.appendChild(link);
        link.click();
    }

    countWords(ignoreWords: string[], minWordLength: number): any {
        return this.wordData
            .split(/[&\r\n'’"“”:;() ,.]+/)
            .map(function(word) {
                return word.toLowerCase().trim();
            })
            .filter(function(word) {
                return (
                    ignoreWords.indexOf(word) === -1 &&
                    word.length >= minWordLength
                );
            })
            .reduce(function(count, word) {
                count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
                return count;
            }, {});
    }

    ngOnChanges() {
        if (this.lastdata === this.wordData) {
            this.configurationService.setBusy(false);
            return;
        }

        this.configurationService.setBusy(true);

        this.setup();
        this.buildSVG();

        this.lastdata = this.wordData;

        let ignoreWords = 'nbsp,a\'s,able,about,above,according,accordingly,across,actually,after,afterwards,again,against,ain\'t,all,allow,allows,almost,alone,along,already,also,although,always,am,among,amongst,an,and,another,any,anybody,anyhow,anyone,anything,anyway,anyways,anywhere,apart,appear,appreciate,appropriate,are,aren\'t,around,as,aside,ask,asking,associated,at,available,away,awfully,be,became,because,become,becomes,becoming,been,before,beforehand,behind,being,believe,below,beside,besides,best,better,between,beyond,both,brief,but,by,c,c\'mon,c\'s,came,campaign,can,can\'t,cannot,cant,cause,causes,certain,certainly,changes,clearly,co,com,come,comes,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldn\'t,course,currently,definitely,described,despite,did,didn\'t,different,do,does,doesn\'t,doing,don\'t,done,down,downwards,during,each,edu,eight,either,else,elsewhere,enough,endorsed,entirely,especially,et,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,far,few,fifth,first,financial,five,followed,following,follows,for,former,formerly,forth,four,from,further,furthermore,get,gets,getting,given,gives,go,goes,going,gone,got,gotten,greetings,had,hadn\'t,happens,hardly,has,hasn\'t,have,haven\'t,having,he,he\'s,hello,help,hence,her,here,here\'s,hereafter,hereby,herein,hereupon,hers,herself,hi,him,himself,his,hither,hopefully,how,howbeit,however,i\'d,i\'ll,i\'m,i\'ve,if,ignored,immediate,in,inasmuch,inc,indeed,indicate,indicated,indicates,inner,insofar,instead,into,inward,is,isn\'t,it,it\'d,it\'ll,it\'s,its,itself,just,keep,keeps,kept,know,knows,known,last,lately,later,latter,latterly,least,less,lest,let,let\'s,like,liked,likely,little,look,looking,looks,ltd,mainly,many,may,maybe,me,mean,meanwhile,merely,might,more,moreover,most,mostly,much,must,my,myself,name,namely,nd,near,nearly,necessary,need,needs,neither,never,nevertheless,new,next,nine,no,nobody,non,none,noone,nor,normally,not,nothing,novel,now,nowhere,obviously,of,off,often,oh,ok,okay,old,on,once,one,ones,only,onto,or,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,own,particular,particularly,per,perhaps,placed,please,plus,possible,presumably,probably,provides,quite,quote,quarterly,rather,really,reasonably,regarding,regardless,regards,relatively,respectively,right,said,same,saw,say,saying,says,second,secondly,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,she,should,shouldn\'t,since,six,so,some,somebody,somehow,someone,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specified,specify,specifying,still,sub,such,sup,sure,t\'s,take,taken,tell,tends,than,thank,thanks,thanx,that,that\'s,thats,the,their,theirs,them,themselves,then,thence,there,there\'s,thereafter,thereby,therefore,therein,theres,thereupon,these,they,they\'d,they\'ll,they\'re,they\'ve,think,third,this,thorough,thoroughly,those,though,three,through,throughout,thru,thus,to,together,too,took,toward,towards,tried,tries,truly,try,trying,twice,two,under,unfortunately,unless,unlikely,until,unto,up,upon,us,use,used,useful,uses,using,usually,uucp,value,various,very,via,viz,vs,want,wants,was,wasn\'t,way,we,we\'d,we\'ll,we\'re,we\'ve,welcome,well,went,were,weren\'t,what,what\'s,whatever,when,whence,whenever,where,where\'s,whereafter,whereas,whereby,wherein,whereupon,wherever,whether,which,while,whither,who,who\'s,whoever,whole,whom,whose,why,will,willing,wish,with,within,without,won\'t,wonder,would,would,wouldn\'t,yes,yet,you,you\'d,you\'ll,you\'re,you\'ve,your,yours,yourself,yourselves,zero,official,sharply,criticized'.split(
            ','
        );

        let counts = this.countWords(ignoreWords, 3);

        if (Object.keys(counts).length < 50) {
            ignoreWords = [];
            counts = this.countWords(ignoreWords, 0);
        }

        const scale =
            15 / Math.max.apply(0, Object.keys(counts).map(key => counts[key]));

        const shortestAxis =
            this.width > this.height ? this.height : this.width;

        this.data = Object.keys(counts)
            .map(function(key) {
                return {
                    text: key,
                    size:
                        counts[key] *
                        scale *
                        (shortestAxis /
                            ConfigurationService.settings.fontScale),
                    color: Math.random()
                };
            })
            .sort(function(a, b) {
                return a.size === b.size ? 0 : a.size > b.size ? -1 : 1;
            })
            .filter(function(value, i) {
                return i < 250;
            });

        this.words = this.data
            .map(function(v) {
                return v.text;
            })
            .join(',');

        this.populate();

        this.configurationService.setBusy(false);

        this.hideSplashScreen();
    }

    private hideSplashScreen() {
        if (this.splashScreen) {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 100);
        }

        this.platform.ready().then(() => {
            if (this.splashScreen) {
                setTimeout(() => {
                    this.splashScreen.hide();
                }, 100);
            }
        });
    }

    private setup() {
        this.margin = {
            top: 10,
            right: 0,
            bottom: 20,
            left: 10
        };

        this.width = window.innerWidth - this.margin.left - this.margin.right;
        this.height = window.innerHeight - this.margin.top - this.margin.bottom;
    }

    private buildSVG() {
        if (this.svg) {
            D3.select('div.word-cloud')
                .select('svg')
                .remove();
        }

        this.svg = D3.select('div.word-cloud')
            .append('svg')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('width', this.width - this.margin.left - this.margin.right)
            .attr('height', this.height - this.margin.top - this.margin.bottom)
            .append('g')
            .attr(
                'transform',
                'translate(' +
                    ~~(this.width / 2) +
                    ',' +
                    ~~(this.height / 2) +
                    ')'
            );
    }

    private populate() {
        const fontWeight: string =
            ConfigurationService.settings.fontWeight == null
                ? 'normal'
                : ConfigurationService.settings.fontWeight;
        const spiralType: string =
            ConfigurationService.settings.spiralType == null
                ? 'archimedean'
                : ConfigurationService.settings.spiralType;

        d3.layout
            .cloud()
            .size([this.width, this.height])
            .words(this.data)
            .padding(3)
            .rotate(() => (~~(Math.random() * 6) - 3) * 30)
            .font(ConfigurationService.settings.fontFace)
            .fontWeight(fontWeight)
            .fontSize(d => d.size)
            .spiral(spiralType)
            .on('end', () => {
                this.drawWordCloud(this.data);
            })
            .start();
    }

    private drawWordCloud(words) {
        const settings = ConfigurationService.settings;

        const defs = this.svg.append('defs');

        const filter = defs
            .append('filter')
            .attr('id', 'glow')
            .attr('x', '-30%')
            .attr('y', '-30%')
            .attr('width', '160%')
            .attr('height', '160%');
        filter
            .append('feGaussianBlur')
            .attr('stdDeviation', '10 10')
            .attr('result', 'glow');

        const feMerge = filter.append('feMerge'); // glow count
        for (let i = 0; i < settings.glowCount; i++) {
            feMerge.append('feMergeNode').attr('in', 'glow');
            feMerge.append('feMergeNode').attr('in', 'glow');
        }

        const enter = this.svg
            .selectAll('text')
            .data(words)
            .enter();

        enter
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('font-family', d => (d.fontFace = settings.fontFace))
            .style('fill', (d, i) => {
                return (
                    'hsl(' +
                    d.color * 360 +
                    ',100%,' +
                    settings.lightnessGlow +
                    ')'
                );
            })
            .attr('text-anchor', 'middle')
            .attr(
                'transform',
                d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
            )
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
                scale =
                    scale < settings.strokeMinWidth
                        ? settings.strokeMinWidth
                        : scale;
                return scale + 'px';
            }) // stroke size divider + min width
            .style(
                'font-family',
                d => (d.fontFace = settings.fontFace) // font face
            )
            .style('fill', (d, i) => {
                return (
                    'hsl(' +
                    d.color * 360 +
                    ',100%, ' +
                    settings.lightness +
                    ')'
                );
            })
            .attr('text-anchor', 'middle')
            .attr(
                'transform',
                d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
            )
            .text(d => {
                return d.text;
            });
    }
}
