const path = require('path')
const vfs = require('vinyl-fs')
const watch = require('glob-watcher')
const chalk = require('chalk')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const scss = require('postcss-scss')

const processors = [
  require('postcss-mixins'),
  require('postcss-extend'),
  require('postcss-simple-vars')({ silent: false }),
  require('postcss-nested'),
  require('postcss-strip-inline-comments')
]

function watchCss(argPath) {
  vfs.src(`${argPath}/**/*.css`)
    .pipe(plumber())
    .pipe(postcss(processors, {syntax: scss}))
    .pipe(rename(path => {
      path.extname = '.wxss'
    }))
    .pipe(vfs.dest(argPath))

  console.log(chalk.green(` 开始监听当前的目录的css文件`))

  const watcher = watch(`${argPath}/**/*.css`)
  watcher.on('change', (filePath, stat) => {
    const folderPath = path.dirname(filePath)
    vfs.src(filePath)
      .pipe(plumber())
      .pipe(postcss(processors, {syntax: scss}))
      .pipe(rename(path => {
        path.extname = '.wxss'
      }))
      .pipe(vfs.dest(folderPath))
  })
}

module.exports = watchCss