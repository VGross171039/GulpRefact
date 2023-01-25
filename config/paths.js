module.exports = {

  root: './public/',

  html: {
    src: ['./src/html/**/*.html', '!./src/html/chunk/*.html'],
    watch: './src/html/**/*.html',
  },

  styles: {
    src: ['./src/sass/style.scss'],
    watch: './src/sass/**/*.scss',
    dest: './public/assets/css/'
  },

  standartCss: {
    src: './public/assets/css/style.css',
    purge: ['./public/**/*.html', './public/assets/js/main.js']
  },

  scriptLibs: {
    src: [
      './src/vendor/app.js',
      './src/vendor/typed.js/lib/typed.js'
    ],
    dest: './public/assets/js/libs/'
  },

  scripts: {
    src: ['./src/scripts/*.ts', './src/scripts/*.js'],
    watch: ['./src/scripts/*.ts', './src/scripts/*.js'],
    dest: './public/assets/js/'
  },

  images: {
    src: ['./src/images/**/*.{png,jpg,jpeg}'],
    watch: ['./src/images/**/*.{png,jpg,jpeg}'],
    dest: './public/assets/images/'
  },

  svgAll: {
    src: './src/images/svg/*.svg',
    watch: './src/images/svg/**/*.svg',
    dest: './public/assets/images/svg/'
  },

  transfer: {
    src: './src/assets/**/*',
    dest: './public/assets/'
  }

}
