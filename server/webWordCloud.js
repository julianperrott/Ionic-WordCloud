// webWordCloud.js
// ========

var svgMask = require('./svgMask');
var Canvas = require('canvas'); // npm install canvas@next.
var cloud = require('./d3.layout.cloud.js');

module.exports = {
  createWordCloud: function (config) {
    try {
      Canvas.registerFont('fonts/' + config.font + '.ttf', { family: config.font });
    } catch (e) {
      console.log('(webWordCloud) Failed to load font. ' + e);
    }

    return new Promise(resolve => {
      var c = cloud()
        .size(config.size)
        .canvas(() => Canvas.createCanvas(1, 1))
        .words(config.words)
        .padding(config.padding)
        .fontWeight('bolder')
        .rotate(() => (~~(Math.random() * 6) - 3) * 30)
        .font(config.font)
        .fontSize(d => d.size)
        .spiral('archimedean')
        .drawMask(async (board, size) => {
          return svgMask.drawMaskAsync(board, size, config.shapeFilename);
        })
        .on('end', words =>
          resolve(
            words.map(w => {
              return { i: w.i, text: w.text, x: w.x, y: w.y, size: w.size, rotate: w.rotate };
            })
          )
        );

      try {
        c.start();
      } catch (e) {
        console.log('(webWordCloud) Failed to load font. ' + e);
        resolve([]);
      }
    });
  }
};
