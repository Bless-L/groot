const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { isObject, isString } = require('./util/index.js')

const tplDir = {
  assets: {
    images: {},
  },
  common: {},
  libs: {},
  models: {},
  modules: {
    pages: {
      index: {
        'index.wxss': path.join(__dirname, './tpl/page/index.wxss'),
        'index.wxml': path.join(__dirname, './tpl/page/index.wxml'),
        'index.js': path.join(__dirname, './tpl/page/index.js'),
        'index.css': path.join(__dirname, './tpl/page/index.css'),
        'index.json': path.join(__dirname, './tpl/page/index.json'),
      }
    },
    components: {},
  },
  'app.css': path.join(__dirname, './tpl/app/app.css'),
  'app.js': path.join(__dirname, './tpl/app/app.js'),
  'app.json': path.join(__dirname, './tpl/app/app.json'),
  'app.wxss': path.join(__dirname, './tpl/app/app.wxss'),
}

function initGroot (appName, rootPath) {
  const appPath = path.join(rootPath, appName)
  if (fs.pathExistsSync(appPath)) {
    console.log(chalk.red(` 项目名${appName}已经被人用过啦，换一个吧！`))
    return
  }
  fs.ensureDirSync(appPath)
  walk(tplDir, appPath)
  console.log(chalk.green(`    初始化项目 ${appName} 成功！`))
  console.log(chalk.green(`    请执行 cd ${appName}，开始你的工作`))
}

function walk (tplDir, rootPath) {
  if (!isObject(tplDir)) {
    throw 'Error: initGroot.js param error'
  }
  for (let k in tplDir) {
    const tpl = tplDir[k]
    if (isObject(tpl)) {
      const mkdirPath = path.join(rootPath, k)
      fs.ensureDirSync(mkdirPath)
      walk(tpl, mkdirPath)
    } else if(isString(tpl)) {
      const targetPath = path.join(rootPath, k)
      fs.copySync(tpl, targetPath)
    }
  }
}

module.exports = initGroot;