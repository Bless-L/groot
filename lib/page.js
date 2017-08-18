const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { isObject, isString } = require('./util/index.js')

const tplDir = {
  'wxss': path.join(__dirname, './tpl/page/index.wxss'),
  'wxml': path.join(__dirname, './tpl/page/index.wxml'),
  'js': path.join(__dirname, './tpl/page/index.js'),
  'css': path.join(__dirname, './tpl/page/index.css'),
  'json': path.join(__dirname, './tpl/page/index.json'),
}

function createPage (pageName, rootPath) {
  const pagePath = path.join(rootPath, pageName)
  if (fs.pathExistsSync(pagePath)) {
    console.log(chalk.red(` 页面${pageName}已经存在当前模块目录中了，换个名字吧~`))
    return
  }
  fs.ensureDirSync(pagePath)
  generate(pageName, tplDir, pagePath)
  console.log(chalk.green(`    创建文件:' ${pageName}/${pageName}.js`))
  console.log(chalk.green(`    创建文件:' ${pageName}/${pageName}.wxss`))
  console.log(chalk.green(`    创建文件:' ${pageName}/${pageName}.wxml`))
  console.log(chalk.green(`    创建文件:' ${pageName}/${pageName}.css`))
  console.log(chalk.green(`    创建文件:' ${pageName}/${pageName}.json`))
}

function generate (pageName, tplDir, pagePath) {
  if (!isObject(tplDir)) {
    throw 'Error: creatPage.js param error'
  }
  for (let k in tplDir) {
    const tplPath = tplDir[k]
    const ext = path.extname(tplPath)
    const targetPath = path.join(pagePath, pageName + ext)
    if (isString(pageName)) {
      if (ext === '.json') {
        changeTitle(pageName, tplPath, targetPath)
      } else {
        fs.copySync(tplPath, targetPath)
      }
    } 
  }
}

function changeTitle (titleName, tplPath, targetPath) {

}

module.exports = createPage;