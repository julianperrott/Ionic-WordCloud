import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Link } from './htmlToLinks.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Events } from 'ionic-angular';
import { IStyle } from '../components/renderStyle/iStyle';

export interface Shape {
    url: string;
    showBackground: boolean;
    canvas: HTMLCanvasElement;
    defs: string,
    attributes: string
}

@Injectable()
export class ConfigurationService {
    configurationChangeSource = new Subject<any>();
    configurationBusySource = new Subject<any>();
    urlChangeSource = new Subject<any>();
    screenshotSource = new Subject<any>();
    styleChangedSource = new Subject<any>();

    configurationChanged$ = this.configurationChangeSource.asObservable();
    UrlChangeSource$ = this.urlChangeSource.asObservable();
    busyChanged$ = this.configurationBusySource.asObservable();
    takeScreenshot$ = this.screenshotSource.asObservable();
    styleChanged$ = this.styleChangedSource.asObservable();

    busy = true;
    error = false;
    url = '';
    backgroundColor = '#000000';
    showShapeBackground = true;
    shapeBackgroundColor = '#FF8300';
    countStyle = 'BANDING';
    shape = 'truck-moving';
    style = 'Glowing';
    color1;
    color2;
    color3;
    strokeStyle;

    defaultData =
        'Page Web Web Web Web Web Web Web Web Cloud How the Word Cloud Generator Works The layout algorithm for positioning page without overlap is available on GitHub under an open source license as d3-cloud. Note that this is the only the layout algorithm and any code for converting text into page and rendering the final output requires additional development. As word placement can be quite slow for more than a few hundred page, the layout algorithm can be run asynchronously, with a configurable time step size. This makes it possible to animate page as they are placed without stuttering. It is recommended to always use a time step even without animations as it prevents the browser’s event loop from blocking while placing the page. The layout algorithm itself is incredibly simple. For each word, starting with the most “important”: Attempt to place the word at some starting point: usually near the middle, or somewhere on a central horizontal line. If the word intersects with any previously placed page, move it one step along an increasing spiral. Repeat until no intersections are found The hard part is making it perform efficiently! According to Jonathan Feinberg, Wordle uses a combination of hierarchical bounding boxes and quadtrees to achieve reasonable speeds. Glyphs in JavaScript There isn’t a way to retrieve precise glyph shapes via the DOM, except perhaps for SVG fonts. Instead, we draw each word to a hidden canvas element, and retrieve the pixel data. Retrieving the pixel data separately for each word is expensive, so we draw as many page as possible and then retrieve their pixels in a batch operation. clouds and Masks My initial implementation performed collision detection using cloud masks. Once a word is placed, it doesnt move, so we can copy it to the appropriate position in a larger cloud representing the whole placement area.The advantage of this is that collision detection only involves comparing a candidate cloud with the relevant area of this larger cloud, rather than comparing with each previous word separately.Somewhat surprisingly, a simple low-level hack made a tremendous difference: when constructing the cloud I compressed blocks of 32 1-bit pixels into 32-bit integers, thus reducing the number of checks (and memory) by 32 times.In fact, this turned out to beat my hierarchical bounding box with quadtree implementation on everything I tried it on (even very large areas and font sizes). I think this is primarily because the cloud version only needs to perform a single collision test per candidate area, whereas the bounding box version has to compare with every other previously placed word that overlaps slightly with the candidate area.Another possibility would be to merge a word’s tree with a single large tree once it is placed. I think this operation would be fairly expensive though compared with the analagous cloud mask operation, which is essentially ORing a whole block.';

    ignoreWords =
        'nbsp,a,s,able,about,above,according,accordingly,across,actually,after,afterwards,again,against,ain,t,all,allow,allows,almost,alone,along,already,also,although,always,am,among,amongst,an,and,another,any,anybody,anyhow,anyone,anything,anyway,anyways,anywhere,apart,appear,appreciate,appropriate,are,aren,t,around,as,aside,ask,asking,associated,at,available,away,awfully,be,became,because,become,becomes,becoming,been,before,beforehand,behind,being,believe,below,beside,besides,best,better,between,beyond,both,brief,but,by,c,c,mon,c,s,came,campaign,can,can,t,cannot,cant,cause,causes,certain,certainly,changes,clearly,co,com,come,comes,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldn,t,course,currently,definitely,described,despite,did,didn,t,different,do,does,doesn,t,doing,don,t,done,down,downwards,during,each,edu,eight,either,else,elsewhere,enough,endorsed,entirely,especially,et,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,far,few,fifth,first,financial,five,followed,following,follows,for,former,formerly,forth,four,from,further,furthermore,get,gets,getting,given,gives,go,goes,going,gone,got,gotten,greetings,had,hadn,t,happens,hardly,has,hasn,t,have,haven,t,having,he,he,s,hello,help,hence,her,here,here,s,hereafter,hereby,herein,hereupon,hers,herself,hi,him,himself,his,hither,hopefully,how,howbeit,however,i,d,i,ll,i,m,i,ve,if,ignored,immediate,in,inasmuch,inc,indeed,indicate,indicated,indicates,inner,insofar,instead,into,inward,is,isn,t,it,it,d,it,ll,it,s,its,itself,just,keep,keeps,kept,know,knows,known,last,lately,later,latter,latterly,least,less,lest,let,let,s,like,liked,likely,little,look,looking,looks,ltd,mainly,many,may,maybe,me,mean,meanwhile,merely,might,more,moreover,most,mostly,much,must,my,myself,name,namely,nd,near,nearly,necessary,need,needs,neither,never,nevertheless,new,next,nine,no,nobody,non,none,noone,nor,normally,not,nothing,novel,now,nowhere,obviously,of,off,often,oh,ok,okay,old,on,once,one,ones,only,onto,or,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,own,particular,particularly,per,perhaps,placed,please,plus,possible,presumably,probably,provides,quite,quote,quarterly,rather,really,reasonably,regarding,regardless,regards,relatively,respectively,right,said,same,saw,say,saying,says,second,secondly,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,she,should,shouldn,t,since,six,so,some,somebody,somehow,someone,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specified,specify,specifying,still,sub,such,sup,sure,t,s,take,taken,tell,tends,than,thank,thanks,thanx,that,that,s,thats,the,their,theirs,them,themselves,then,thence,there,there,s,thereafter,thereby,therefore,therein,theres,thereupon,these,they,they,d,they,ll,they,re,they,ve,think,third,this,thorough,thoroughly,those,though,three,through,throughout,thru,thus,to,together,too,took,toward,towards,tried,tries,truly,try,trying,twice,two,under,unfortunately,unless,unlikely,until,unto,up,upon,us,use,used,useful,uses,using,usually,uucp,value,various,very,via,viz,vs,want,wants,was,wasn,t,way,we,we,d,we,ll,we,re,we,ve,welcome,well,went,were,weren,t,what,what,s,whatever,when,whence,whenever,where,where,s,whereafter,whereas,whereby,wherein,whereupon,wherever,whether,which,while,whither,who,who,s,whoever,whole,whom,whose,why,will,willing,wish,with,within,without,won,t,wonder,would,would,wouldn,t,yes,yet,you,you,d,you,ll,you,re,you,ve,your,yours,yourself,yourselves,zero,official,sharply,criticized';

    defaultLinks: Link[] = [
        { href: 'https://www.bbc.co.uk/news', text: 'BBC News' } as Link,
        { href: 'https://www.bbc.co.uk/sport', text: 'BBC Sport' } as Link,
        { href: 'https://uk.reuters.com/', text: 'Reuters Uk' } as Link,
        { href: 'https://edition.cnn.com/', text: 'CNN' } as Link
    ];

    constructor(screenOrientation: ScreenOrientation, events: Events) {
        screenOrientation.onChange().subscribe(() => {
            setTimeout(() => {
                this.configurationChanged('');
            }, 1000);
        });

        events.subscribe('shapeChanged', shape => {
            this.shape = shape;
            this.configurationChanged('');
        });
    }

    setStrokeStyle(style: IStyle) {
        this.strokeStyle = style.strokeStyle;
        if (!this.strokeStyle) {
            this.strokeStyle = 'UNDEFINED';
        }
    }

    getShape(filter): Shape {

        //var glow = '<feGaussianBlur stdDeviation="2 2" result="stage1Filter"></feGaussianBlur><feMerge><feMergeNode in="stage1Filter"></feMergeNode><feMergeNode in="stage1Filter"></feMergeNode></feMerge>';

        filter='';

        if (filter==='')
        {
            return {
                url: this.shape && this.shape.length > 0 ? './assets/vendor/fontawesome/svgs/solid/' + this.shape + '.svg' : '',
                showBackground: this.showShapeBackground,
                canvas: undefined,
                defs: '' ,
                attributes: '  fill="'+this.shapeBackgroundColor+'" '
            };
        }
        else{

            var filterHtml =  '<defs><filter id="wwwfilter2" x="-30%" y="-30%" width="160%" height="160%">' + filter +'</filter></defs>';
            return {
                url: this.shape && this.shape.length > 0 ? './assets/vendor/fontawesome/svgs/solid/' + this.shape + '.svg' : '',
                showBackground: this.showShapeBackground,
                canvas: undefined,
                defs: filterHtml ,
                attributes: ' filter="url(#wwwfilter2)" fill="'+this.shapeBackgroundColor+'" '
            };
        }

    }

    fontChanged(name: string) {
        setTimeout(() => {
            this.configurationChangeSource.next(name);
        }, 100);
    }

    styleChanged(name: string) {
        setTimeout(() => {
            this.styleChangedSource.next(name);
        }, 100);
    }

    configurationChanged(name: string) {
        this.setBusy(true);

        setTimeout(() => {
            this.configurationChangeSource.next(name);
        }, 100);
    }

    takeScreenshot(name: string) {
        setTimeout(() => {
            this.screenshotSource.next(name);
        }, 100);
    }

    isBusy(): boolean {
        return this.busy;
    }
    setBusy(state: boolean): void {
        // console.log('busy ' + state);
        this.busy = state;
        this.configurationBusySource.next(name);
    }

    setError() {
        this.error = true;
        setTimeout(() => {
            this.configurationBusySource.next(name);
        }, 100);
    }

    setUrl(url: string) {
        this.url = url;
        setTimeout(() => {
            this.urlChangeSource.next(name);
        }, 100);
    }

    clearError() {
        this.error = false;
        setTimeout(() => {
            this.configurationBusySource.next(name);
        }, 100);
    }

    setFloodColor(name: string, value: string) {
        if (!value) {
            return;
        }
        const element = document.getElementById(name);
        if (element) {
            if (element.hasAttribute('flood-color')) {
                element.setAttribute('flood-color', value);
            }
            if (element.hasAttribute('lighting-color')) {
                element.setAttribute('lighting-color', value);
            }
        }
    }

    settings = {
        name: 'Pacifico Glow',
        fontFace: 'Pacifico',
        spiralType: 'archimedean',
        fontWeight: 'bolder',
        fontScale: 100,
        strokeColour: 'white',
        strokeOpacity: '1',
        strokeScale: 20,
        strokeMinWidth: 1,
        glowCount: 2,
        lightness: '50%',
        lightnessGlow: '50%'
    };
}
