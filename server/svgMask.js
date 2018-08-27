// svgMask.js
// ========
var Rsvg = require('librsvg-prebuilt').Rsvg;
var fs = require('fs');
var path = require('path');

module.exports = {
  drawMaskAsync: async function(board, size, shapeFilename) {
    var cWidth = size[0];
    var cHeight = size[1];

    return new Promise(resolve => {

      if (!shapeFilename || shapeFilename.length===0){
        console.log('(drawMaskAsync) no shape to mask');
        resolve();
        return;
      }

      console.log('(drawMaskAsync) reading shape '+shapeFilename);

      var svg = new Rsvg();

      svg.on('finish', function() {
        console.log('(drawMaskAsync) SVG read (' + svg.width + ',' + svg.height + '), Screen (' + cWidth + ',' + cHeight + ')');

        var buffer = svg.render({ format: 'raw', width: size[0], height: size[1] }).data;
        var pixels = [...buffer];

        // mask the board
        var boardWidth = cWidth >> 5; // divide by 32
        for (var yy = 0; yy < cHeight; yy++) {
          for (var xx = 0; xx < cWidth; xx++) {
            //var red = pixels[(cWidth * yy + xx) * 4];
            //var green = pixels[(cWidth * yy + xx) * 4 + 1];
            //var blue = pixels[(cWidth * yy + xx) * 4 + 2];
            var alpha = pixels[(cWidth * yy + xx) * 4 + 3];
            var isSet = alpha === 0;

            if (isSet) {
              var bit = xx - ((xx >> 5) << 5);
              var bitVal = 1 << (31 - bit);
              board[yy * boardWidth + (xx >> 5)] |= bitVal;
            }
          }
        }

        resolve();
      });

      var filename = path.join(__dirname, 'svg/fontawesome/svgs/solid', shapeFilename);
      rs = fs.createReadStream(filename);
      rs.on('error', e => {
        console.log('(svgMask) - Failed to read file: ' + filename + '. ' + e);
        resolve();
      });
      rs.pipe(svg);
    });
  }
};
