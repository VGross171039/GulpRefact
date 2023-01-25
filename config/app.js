module.exports = {

  fileinclude: {
    prefix: '@',
    basepath: '@file'
  },

  autoprefixer: {
    cascade: false
  },

  cleanCSS: {
    level: 2
  },

  rename: {
    basename: 'style'
  },

  ts: {
    noImplicitAny: true,
    outFile: 'main.js',
    allowJs: true,
    target: 'ES2015'
  },

  imagemin: {
    verbose: true
  },

  svgmin: {
    js2svg: {
      pretty: true
    }
  },

  cheerio: {
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: { xmlMode: true }
  },

  svgSprite: {
    mode: {
      symbol: {
        sprite: "sprite.svg"
      }
    }
  }

}
