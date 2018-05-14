import { Component, Input, OnChanges } from '@angular/core';

import { ConfigurationService } from '../../app/configuration.service';

import * as D3 from 'd3';

declare var d3: any;

@Component({
    selector: 'word-cloud',
    template: '<div class="word-cloud"></div> {{words}}<hr/>',
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

    constructor(private configurationService: ConfigurationService) {
        configurationService.configurationChanged$.subscribe(v => {
            this.lastdata = '';
            this.ngOnChanges();
        });
    }

    ngOnChanges() {
        if (this.lastdata === this.wordData) {
            return;
        }

        this.setup();
        this.buildSVG();

        this.lastdata = this.wordData;

        const ignoreWords = "nbsp,a's,able,about,above,according,accordingly,across,actually,after,afterwards,again,against,ain't,all,allow,allows,almost,alone,along,already,also,although,always,am,among,amongst,an,and,another,any,anybody,anyhow,anyone,anything,anyway,anyways,anywhere,apart,appear,appreciate,appropriate,are,aren't,around,as,aside,ask,asking,associated,at,available,away,awfully,be,became,because,become,becomes,becoming,been,before,beforehand,behind,being,believe,below,beside,besides,best,better,between,beyond,both,brief,but,by,c,c'mon,c's,came,campaign,can,can't,cannot,cant,cause,causes,certain,certainly,changes,clearly,co,com,come,comes,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldn't,course,currently,definitely,described,despite,did,didn't,different,do,does,doesn't,doing,don't,done,down,downwards,during,each,edu,eight,either,else,elsewhere,enough,endorsed,entirely,especially,et,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,far,few,fifth,first,financial,five,followed,following,follows,for,former,formerly,forth,four,from,further,furthermore,get,gets,getting,given,gives,go,goes,going,gone,got,gotten,greetings,had,hadn't,happens,hardly,has,hasn't,have,haven't,having,he,he's,hello,help,hence,her,here,here's,hereafter,hereby,herein,hereupon,hers,herself,hi,him,himself,his,hither,hopefully,how,howbeit,however,i'd,i'll,i'm,i've,if,ignored,immediate,in,inasmuch,inc,indeed,indicate,indicated,indicates,inner,insofar,instead,into,inward,is,isn't,it,it'd,it'll,it's,its,itself,just,keep,keeps,kept,know,knows,known,last,lately,later,latter,latterly,least,less,lest,let,let's,like,liked,likely,little,look,looking,looks,ltd,mainly,many,may,maybe,me,mean,meanwhile,merely,might,more,moreover,most,mostly,much,must,my,myself,name,namely,nd,near,nearly,necessary,need,needs,neither,never,nevertheless,new,next,nine,no,nobody,non,none,noone,nor,normally,not,nothing,novel,now,nowhere,obviously,of,off,often,oh,ok,okay,old,on,once,one,ones,only,onto,or,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,own,particular,particularly,per,perhaps,placed,please,plus,possible,presumably,probably,provides,quite,quote,quarterly,rather,really,reasonably,regarding,regardless,regards,relatively,respectively,right,said,same,saw,say,saying,says,second,secondly,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,she,should,shouldn't,since,six,so,some,somebody,somehow,someone,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specified,specify,specifying,still,sub,such,sup,sure,t's,take,taken,tell,tends,than,thank,thanks,thanx,that,that's,thats,the,their,theirs,them,themselves,then,thence,there,there's,thereafter,thereby,therefore,therein,theres,thereupon,these,they,they'd,they'll,they're,they've,think,third,this,thorough,thoroughly,those,though,three,through,throughout,thru,thus,to,together,too,took,toward,towards,tried,tries,truly,try,trying,twice,two,under,unfortunately,unless,unlikely,until,unto,up,upon,us,use,used,useful,uses,using,usually,uucp,value,various,very,via,viz,vs,want,wants,was,wasn't,way,we,we'd,we'll,we're,we've,welcome,well,went,were,weren't,what,what's,whatever,when,whence,whenever,where,where's,whereafter,whereas,whereby,wherein,whereupon,wherever,whether,which,while,whither,who,who's,whoever,whole,whom,whose,why,will,willing,wish,with,within,without,won't,wonder,would,would,wouldn't,yes,yet,you,you'd,you'll,you're,you've,your,yours,yourself,yourselves,zero,official,sharply,criticized".split(
            ','
        );

        const counts = this.wordData
            .split(/[&\r\n'’"“”:;() ,.]+/)
            .map(function(word) {
                return word.toLowerCase().trim();
            })
            .filter(function(word) {
                return ignoreWords.indexOf(word) === -1 && word.length > 3;
            })
            .reduce(function(count, word) {
                count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
                return count;
            }, {});

        const shortestAxis =
            this.width > this.height ? this.height : this.width;

        this.data = Object.keys(counts)
            .map(function(key) {
                return {
                    text: key,
                    size:
                        counts[key] *
                        (shortestAxis / ConfigurationService.settings.fontScale)
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

        const size = this.width > this.height ? this.height : this.width;

        d3.layout
            .cloud()
            .size([this.width,  this.height])
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
        this.svg
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style(
                'font-family',
                d => (d.fontFace = ConfigurationService.settings.fontFace)
            )
            .style('fill', (d, i) => {
                return 'hsl(' + Math.random() * 360 + ',100%,50%)';
            })
            .attr('text-anchor', 'middle')
            .attr(
                'transform',
                d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
            )
            .attr('class', 'shadow')
            .text(d => {
                return d.text;
            });

        var defs = this.svg.select('text');

        var filter = defs.append('filter').attr('id', 'glow');
        filter
            .append('feGaussianBlur')
            .attr('stdDeviation', '3.5')
            .attr('result', 'coloredBlur');
        var feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    }
}
