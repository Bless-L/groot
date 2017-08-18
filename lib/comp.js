const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { isObject, isString } = require('./util/index.js')

const tplDir = {
  'wxss': path.join(__dirname, './tpl/component/comp.wxss'),
  'wxml': path.join(__dirname, './tpl/component/comp.wxml'),
  'js': path.join(__dirname, './tpl/component/comp.js'),
  'css': path.join(__dirname, './tpl/component/comp.css'),
}

function createComp (compName, rootPath) {
  const compPath = path.join(rootPath, compName)
  if (fs.pathExistsSync(compPath)) {
    console.log(chalk.red(` 组件${compName}已经存在当前模块目录中了，换个名字吧~`))
    return
  }
  fs.ensureDirSync(compPath)
  generate(compName, tplDir, compPath)
  console.log(chalk.green(`    创建文件:' ${compName}/${compName}.js`))
  console.log(chalk.green(`    创建文件:' ${compName}/${compName}.wxss`))
  console.log(chalk.green(`    创建文件:' ${compName}/${compName}.wxml`))
  console.log(chalk.green(`    创建文件:' ${compName}/${compName}.css`))
  console.log(chalk.green(`    创建文件:' ${compName}/${compName}.json`))
}

function generate (compName, tplDir, compPath) {
  if (!isObject(tplDir)) {
    throw 'Error: creatPage.js param error'
  }
  for (let k in tplDir) {
    const value = tplDir[k]
    const ext = path.extname(value)
    const targetPath = path.join(compPath, compName + ext)
    if (isString(compName)) {
      fs.copySync(value, targetPath)
    } 
  }
}

module.exports = createComp;