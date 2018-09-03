var bodyParser = require('body-parser');
var express = require('express');
var webWordCloud = require('./webWordCloud');
var app = express();
var port;

if (process && process.env) { port = process.env.PORT; }

if (!port) {
  console.log('post was undefined, defaulting to 3000.');
  port = 3000;
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('hello in log, default path called');
  res.send('Hello World !');
});

app.post('/CreateCloud', function(req, res, next) {
  process(res,req.body);
});

app.get('/test', (req, res) => {
  process(res,testData);
});


function process(res,data){
  var start = Date.now();
  try {
    webWordCloud
      .createWordCloud(data)
      .then(wordCloud => {
        var result = { duration: (Date.now() - start), wordCloud: wordCloud};
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
        console.log('(server) CreateCloud duration: ' + (Date.now() - start) + ' ms.');
      })
      .catch(e => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ error: e, wordCloud: [] }));
        console.log(e);
      });
  } catch (e) {
    console.log('(server)' + e);
  }
}

  var testData = {
    size: [1900, 914],
    padding: 2,
    font: 'Pacifico',
    words: [
      { text: 'word', size: 161.82857142857142, color: 0.7747192151170599, i: 0, drawn: false },
      { text: 'cloud', size: 121.37142857142857, color: 0.6586079287600115, i: 1, drawn: false },
      { text: 'page', size: 121.37142857142857, color: 0.513875561100452, i: 2, drawn: false },
      { text: 'layout', size: 101.14285714285714, color: 0.2820545368950711, i: 3, drawn: false },
      { text: 'area', size: 101.14285714285714, color: 0.9745678245506915, i: 4, drawn: false },
      { text: 'algorithm', size: 101.14285714285714, color: 0.25021321721739387, i: 5, drawn: false },
      { text: 'operation', size: 67.42857142857143, color: 0.3711011084957261, i: 6, drawn: false },
      { text: 'candidate', size: 67.42857142857143, color: 0.7889953237381915, i: 7, drawn: false },
      { text: 'step', size: 67.42857142857143, color: 0.017580707827067332, i: 8, drawn: false },
      { text: 'collision', size: 67.42857142857143, color: 0.633186884149183, i: 9, drawn: false },
      { text: 'bounding', size: 67.42857142857143, color: 0.039790393549094194, i: 10, drawn: false },
      { text: 'placement', size: 53.94285714285714, color: 0.24183224930656655, i: 11, drawn: false },
      { text: 'time', size: 53.94285714285714, color: 0.1303581439429251, i: 12, drawn: false },
      { text: 'retrieve', size: 53.94285714285714, color: 0.4330064956466375, i: 13, drawn: false },
      { text: 'draw', size: 53.94285714285714, color: 0.30625692314031516, i: 14, drawn: false },
      { text: 'simple', size: 53.94285714285714, color: 0.5499301673433374, i: 15, drawn: false },
      { text: 'data', size: 53.94285714285714, color: 0.26546071753490375, i: 16, drawn: false },
      { text: 'separately', size: 53.94285714285714, color: 0.800715315924788, i: 17, drawn: false },
      { text: 'expensive', size: 53.94285714285714, color: 0.9386884100734032, i: 18, drawn: false },
      { text: 'hierarchical', size: 53.94285714285714, color: 0.7078095455585836, i: 19, drawn: false },
      { text: 'tree', size: 53.94285714285714, color: 0.6355160797888546, i: 20, drawn: false },
      { text: 'starting', size: 40.457142857142856, color: 0.13212711668442312, i: 21, drawn: false },
      { text: 'pixels', size: 40.457142857142856, color: 0.36558798171599594, i: 22, drawn: false },
      { text: 'implementation', size: 40.457142857142856, color: 0.6563912291258223, i: 23, drawn: false },
      { text: 'previously', size: 40.457142857142856, color: 0.21905971471723928, i: 24, drawn: false },
      { text: 'detection', size: 40.457142857142856, color: 0.38459278514381556, i: 25, drawn: false },
      { text: 'larger', size: 40.457142857142856, color: 0.41512069105393046, i: 26, drawn: false },
      { text: 'move', size: 40.457142857142856, color: 0.19752975534854644, i: 27, drawn: false },
      { text: 'comparing', size: 40.457142857142856, color: 0.48282608094338797, i: 28, drawn: false },
      { text: 'perform', size: 40.457142857142856, color: 0.5891254754388888, i: 29, drawn: false },
      { text: 'large', size: 40.457142857142856, color: 0.0848143095904117, i: 30, drawn: false },
      { text: 'version', size: 40.457142857142856, color: 0.3926043563177186, i: 31, drawn: false },
      { text: 'single', size: 40.457142857142856, color: 0.5943847652536791, i: 32, drawn: false },
      { text: 'pixel', size: 40.457142857142856, color: 0.6789823173680805, i: 33, drawn: false },
      { text: 'recommended', size: 40.457142857142856, color: 0.9315471521148431, i: 34, drawn: false },
      { text: 'animations', size: 40.457142857142856, color: 0.4242477047317901, i: 35, drawn: false },
      { text: 'prevents', size: 40.457142857142856, color: 0.2036092475468867, i: 36, drawn: false },
      { text: 'browser', size: 40.457142857142856, color: 0.49433824208534416, i: 37, drawn: false },
      { text: 'event', size: 40.457142857142856, color: 0.8662022842866648, i: 38, drawn: false },
      { text: 'loop', size: 40.457142857142856, color: 0.39557516083314104, i: 39, drawn: false },
      { text: 'masks', size: 40.457142857142856, color: 0.48577299972064814, i: 40, drawn: false },
      { text: 'blocking', size: 26.97142857142857, color: 0.7822370838584711, i: 41, drawn: false },
      { text: 'placing', size: 26.97142857142857, color: 0.8172637296476333, i: 42, drawn: false },
      { text: 'incredibly', size: 26.97142857142857, color: 0.28039887508651185, i: 43, drawn: false },
      { text: 'positioning', size: 26.97142857142857, color: 0.2961138282178155, i: 44, drawn: false },
      { text: 'overlap', size: 26.97142857142857, color: 0.5046091662354582, i: 45, drawn: false },
      { text: 'important', size: 26.97142857142857, color: 0.8876427760614367, i: 46, drawn: false },
      { text: 'attempt', size: 26.97142857142857, color: 0.47820688437524805, i: 47, drawn: false },
      { text: 'place', size: 26.97142857142857, color: 0.3235222408340328, i: 48, drawn: false },
      { text: 'point', size: 26.97142857142857, color: 0.8615806131656032, i: 49, drawn: false },
      { text: 'middle', size: 26.97142857142857, color: 0.01859909253481029, i: 50, drawn: false },
      { text: 'central', size: 26.97142857142857, color: 0.5287910273902974, i: 51, drawn: false },
      { text: 'horizontal', size: 26.97142857142857, color: 0.9967113165741674, i: 52, drawn: false },
      { text: 'line', size: 26.97142857142857, color: 0.3782502521023403, i: 53, drawn: false },
      { text: 'intersects', size: 26.97142857142857, color: 0.266002818331039, i: 54, drawn: false },
      { text: 'github', size: 26.97142857142857, color: 0.17713131725274556, i: 55, drawn: false },
      { text: 'open', size: 26.97142857142857, color: 0.3164329944549822, i: 56, drawn: false },
      { text: 'increasing', size: 26.97142857142857, color: 0.6472107782249292, i: 57, drawn: false },
      { text: 'spiral', size: 26.97142857142857, color: 0.3254258636045646, i: 58, drawn: false },
      { text: 'repeat', size: 26.97142857142857, color: 0.753569249291282, i: 59, drawn: false },
      { text: 'intersections', size: 26.97142857142857, color: 0.23521950054089125, i: 60, drawn: false },
      { text: 'found', size: 26.97142857142857, color: 0.20802257533654478, i: 61, drawn: false },
      { text: 'hard', size: 26.97142857142857, color: 0.12762417716214536, i: 62, drawn: false },
      { text: 'part', size: 26.97142857142857, color: 0.2770438664263608, i: 63, drawn: false },
      { text: 'making', size: 26.97142857142857, color: 0.505796265224109, i: 64, drawn: false },
      { text: 'source', size: 26.97142857142857, color: 0.0716644738171146, i: 65, drawn: false },
      { text: 'efficiently!', size: 26.97142857142857, color: 0.6378188238452813, i: 66, drawn: false },
      { text: 'jonathan', size: 26.97142857142857, color: 0.1060141888108137, i: 67, drawn: false },
      { text: 'feinberg', size: 26.97142857142857, color: 0.6486776638480412, i: 68, drawn: false },
      { text: 'wordle', size: 26.97142857142857, color: 0.008962305776960111, i: 69, drawn: false },
      { text: 'combination', size: 26.97142857142857, color: 0.8384710000316593, i: 70, drawn: false },
      { text: 'license', size: 26.97142857142857, color: 0.42257670649881285, i: 71, drawn: false },
      { text: 'd3-cloud', size: 26.97142857142857, color: 0.2861392019219584, i: 72, drawn: false },
      { text: 'boxes', size: 26.97142857142857, color: 0.533433483843196, i: 73, drawn: false },
      { text: 'quadtrees', size: 26.97142857142857, color: 0.38486288537312685, i: 74, drawn: false },
      { text: 'achieve', size: 26.97142857142857, color: 0.7225842348068017, i: 75, drawn: false },
      { text: 'reasonable', size: 26.97142857142857, color: 0.16902717374412846, i: 76, drawn: false },
      { text: 'speeds', size: 26.97142857142857, color: 0.3042360106712556, i: 77, drawn: false },
      { text: 'glyphs', size: 26.97142857142857, color: 0.686388445235512, i: 78, drawn: false },
      { text: 'note', size: 26.97142857142857, color: 0.006739542921048169, i: 79, drawn: false },
      { text: 'code', size: 26.97142857142857, color: 0.1424718088393746, i: 80, drawn: false },
      { text: 'made', size: 20.228571428571428, color: 0.9805967552827017, i: 81, drawn: false },
      { text: 'precise', size: 20.228571428571428, color: 0.4032511398257306, i: 82, drawn: false },
      { text: 'shapes', size: 20.228571428571428, color: 0.5200510630564728, i: 83, drawn: false },
      { text: 'fonts', size: 20.228571428571428, color: 0.36691365128718734, i: 84, drawn: false },
      { text: 'converting', size: 20.228571428571428, color: 0.031257637763853374, i: 85, drawn: false },
      { text: 'hidden', size: 20.228571428571428, color: 0.09870666901253178, i: 86, drawn: false },
      { text: 'canvas', size: 20.228571428571428, color: 0.3680354095618681, i: 87, drawn: false },
      { text: 'element', size: 20.228571428571428, color: 0.40080140625858274, i: 88, drawn: false },
      { text: 'text', size: 20.228571428571428, color: 0.2742924711315471, i: 89, drawn: false },
      { text: 'rendering', size: 20.228571428571428, color: 0.4014915794204763, i: 90, drawn: false },
      { text: 'retrieving', size: 20.228571428571428, color: 0.6731673130636282, i: 91, drawn: false },
      { text: 'final', size: 20.228571428571428, color: 0.23487868292772252, i: 92, drawn: false },
      { text: 'output', size: 20.228571428571428, color: 0.2345465164316589, i: 93, drawn: false },
      { text: 'requires', size: 20.228571428571428, color: 0.8636732823606668, i: 94, drawn: false },
      { text: 'batch', size: 20.228571428571428, color: 0.3940884766489432, i: 95, drawn: false },
      { text: 'additional', size: 20.228571428571428, color: 0.027214946519971805, i: 96, drawn: false },
      { text: 'clouds', size: 20.228571428571428, color: 0.8298842731959095, i: 97, drawn: false },
      { text: 'development', size: 20.228571428571428, color: 0.39210597892587895, i: 98, drawn: false },
      { text: 'initial', size: 20.228571428571428, color: 0.33634815026003206, i: 99, drawn: false },
      { text: 'works', size: 20.228571428571428, color: 0.7014711780028053, i: 100, drawn: false },
      { text: 'performed', size: 20.228571428571428, color: 0.6041853711271792, i: 101, drawn: false },
      { text: 'slow', size: 20.228571428571428, color: 0.5831347489014878, i: 102, drawn: false },
      { text: 'hundred', size: 20.228571428571428, color: 0.39006168294666677, i: 103, drawn: false },
      { text: 'doesnt', size: 20.228571428571428, color: 0.8914618314297962, i: 104, drawn: false },
      { text: 'copy', size: 20.228571428571428, color: 0.06206826076723981, i: 105, drawn: false },
      { text: 'position', size: 20.228571428571428, color: 0.5160501491678378, i: 106, drawn: false },
      { text: 'asynchronously', size: 20.228571428571428, color: 0.6040017433625624, i: 107, drawn: false },
      { text: 'representing', size: 20.228571428571428, color: 0.6849096106332992, i: 108, drawn: false },
      { text: 'configurable', size: 20.228571428571428, color: 0.013188447313972507, i: 109, drawn: false },
      { text: 'advantage', size: 20.228571428571428, color: 0.8302305325774719, i: 110, drawn: false },
      { text: 'involves', size: 20.228571428571428, color: 0.8404008121023578, i: 111, drawn: false },
      { text: 'block', size: 20.228571428571428, color: 0.1818514957128048, i: 112, drawn: false },
      { text: 'generator', size: 20.228571428571428, color: 0.9029478488742715, i: 113, drawn: false },
      { text: 'relevant', size: 20.228571428571428, color: 0.3646037143569334, i: 114, drawn: false },
      { text: 'previous', size: 20.228571428571428, color: 0.6683400005200837, i: 115, drawn: false },
      { text: 'surprisingly', size: 20.228571428571428, color: 0.8034136889382848, i: 116, drawn: false },
      { text: 'low-level', size: 20.228571428571428, color: 0.04550735173034193, i: 117, drawn: false },
      { text: 'hack', size: 20.228571428571428, color: 0.7277397511818087, i: 118, drawn: false },
      { text: 'glyph', size: 20.228571428571428, color: 0.4438527890246, i: 119, drawn: false },
      { text: 'tremendous', size: 20.228571428571428, color: 0.7817735112683182, i: 120, drawn: false },
      { text: 'difference', size: 20.228571428571428, color: 0.4604692944749038, i: 121, drawn: false },
      { text: 'constructing', size: 20.228571428571428, color: 0.9577764010869512, i: 122, drawn: false },
      { text: 'compressed', size: 20.228571428571428, color: 0.3631870630101668, i: 123, drawn: false },
      { text: 'blocks', size: 20.228571428571428, color: 0.3804787128543887, i: 124, drawn: false },
      { text: '1-bit', size: 20.228571428571428, color: 0.49817698917352393, i: 125, drawn: false },
      { text: '32-bit', size: 20.228571428571428, color: 0.4640665816602467, i: 126, drawn: false },
      { text: 'integers', size: 20.228571428571428, color: 0.06810460493309489, i: 127, drawn: false },
      { text: 'reducing', size: 20.228571428571428, color: 0.4174520757623206, i: 128, drawn: false },
      { text: 'number', size: 20.228571428571428, color: 0.8208321896286133, i: 129, drawn: false },
      { text: 'checks', size: 20.228571428571428, color: 0.10675635159355057, i: 130, drawn: false },
      { text: 'memory', size: 20.228571428571428, color: 0.9739619130259471, i: 131, drawn: false },
      { text: 'times', size: 20.228571428571428, color: 0.9591082140143399, i: 132, drawn: false },
      { text: 'fact', size: 20.228571428571428, color: 0.6382054572924911, i: 133, drawn: false },
      { text: 'turned', size: 20.228571428571428, color: 0.024751480792742697, i: 134, drawn: false },
      { text: 'beat', size: 20.228571428571428, color: 0.5561300284167201, i: 135, drawn: false },
      { text: 'quadtree', size: 20.228571428571428, color: 0.34706047542349183, i: 136, drawn: false },
      { text: 'size', size: 20.228571428571428, color: 0.5805155899498637, i: 137, drawn: false },
      { text: 'areas', size: 20.228571428571428, color: 0.14846753395590806, i: 138, drawn: false },
      { text: 'font', size: 20.228571428571428, color: 0.04910487109604911, i: 139, drawn: false },
      { text: 'sizes', size: 20.228571428571428, color: 0.9674470532420403, i: 140, drawn: false },
      { text: 'primarily', size: 20.228571428571428, color: 0.7451597717520282, i: 141, drawn: false },
      { text: 'makes', size: 20.228571428571428, color: 0.022056845843688944, i: 142, drawn: false },
      { text: 'animate', size: 20.228571428571428, color: 0.8247299670628352, i: 143, drawn: false },
      { text: 'test', size: 20.228571428571428, color: 0.15726573850572634, i: 144, drawn: false },
      { text: 'compare', size: 20.228571428571428, color: 0.9707296645226775, i: 145, drawn: false },
      { text: 'overlaps', size: 20.228571428571428, color: 0.1826229780308095, i: 146, drawn: false },
      { text: 'slightly', size: 20.228571428571428, color: 0.21807885368668245, i: 147, drawn: false },
      { text: 'possibility', size: 20.228571428571428, color: 0.5850269105647554, i: 148, drawn: false },
      { text: 'merge', size: 20.228571428571428, color: 0.10917225406634579, i: 149, drawn: false },
      { text: 'stuttering', size: 20.228571428571428, color: 0.26987281640639815, i: 150, drawn: false },
      { text: 'fairly', size: 20.228571428571428, color: 0.6107224892961984, i: 151, drawn: false },
      { text: 'compared', size: 20.228571428571428, color: 0.12009999510856062, i: 152, drawn: false },
      { text: 'analagous', size: 20.228571428571428, color: 0.23839757490533264, i: 153, drawn: false },
      { text: 'mask', size: 20.228571428571428, color: 0.2887428231182243, i: 154, drawn: false },
      { text: 'essentially', size: 20.228571428571428, color: 0.09720610823382403, i: 155, drawn: false },
      { text: 'oring', size: 20.228571428571428, color: 0.8829638721744075, i: 156, drawn: false },
      { text: 'javascript', size: 20.228571428571428, color: 0.9152022739816004, i: 157, drawn: false }
    ],
    shapeFilename: 'truck-moving.svg'
  };



console.log('I am alive on port ' + port);

app.listen(port, () => console.log('Example app listening on port ' + port));
