/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const chalk = require('chalk')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const prompt = Promise.promisifyAll(require('prompt'))
const template = require('lodash.template')

// OUTPUT DIRECTORIES
const APP_CONTAINER_DIR = path.join('app', 'containers')
const APP_COMPONENT_DIR = path.join('app', 'components')
const container = (fn) => path.join(APP_CONTAINER_DIR, fn)
const component = (fn) => path.join(APP_COMPONENT_DIR, fn)

// IDENTIFIER CASE CONVERTERS
const camel2Pascal = (name) => name.replace(/^[a-z]/, (c) => c.toUpperCase())
const camel2Dashed = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
const dashed2Camel = (name) => name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
const pascal2Camel = (name) => name.replace(/^[A-Z]/, (c) => c.toLowerCase())
const pascal2Dashed = (name) => camel2Dashed(pascal2Camel(name))

// COLOURED OUTPUT AND ERRORS
const greenWrite = (text) => process.stdout.write(chalk.green(text))
const redWrite = (text) => process.stdout.write(chalk.red(text))
const printCheckMark = () => greenWrite(' ✓\n')
const errorOut = (message) => () => {
    redWrite(message)
    process.exit()
}

// GENERATION FLOW
const getUserInput = (schema) => {
    prompt.start()
    return prompt.getAsync(schema)
        .catch(() => {
            redWrite('\nOperation cancelled\n')
            process.exit()
        })
}

const getGeneratorAsset = (fn) => fs.readFileAsync(path.join(__dirname, fn), 'utf8')

const getGeneratorDir = (dir) => fs.readdirAsync(path.join(__dirname, dir))

const processTemplate = (context) => (templateString) =>
      template(templateString, {variable: 'context'})(context)

const writeToPath = (path) => (contents) => fs.writeFileAsync(path, contents, 'utf8')

const transformFile = (inpath, context, outpath) => {
    return getGeneratorAsset(inpath)
        .then(processTemplate(context))
        .then(writeToPath(outpath))
        .tap(() => process.stdout.write(`Wrote ${outpath}\n`))
}

// FILE MANIPULATION

const mkdirIfNonexistent = (dirname) =>
      fs.statAsync(dirname).catch(() => fs.mkdirAsync(dirname))

// UTILITIES
const clearNulls = (items) => items.filter((item) => item !== null)

const step = (message, operation) => (value) => {
    return Promise.resolve(value)
        .tap(() => process.stdout.write(message))
        .then(operation)
        .tap(printCheckMark)
}

module.exports = {
    APP_CONTAINER_DIR,
    APP_COMPONENT_DIR,
    container,
    component,

    camel2Pascal,
    camel2Dashed,
    dashed2Camel,
    pascal2Camel,
    pascal2Dashed,

    greenWrite,
    redWrite,
    printCheckMark,
    errorOut,

    getUserInput,
    getGeneratorAsset,
    getGeneratorDir,
    processTemplate,
    writeToPath,
    transformFile,

    mkdirIfNonexistent,

    clearNulls,
    step,
}
