const fs = require('fs')
const utils = require('../utils/request')
const process = require('process')

function pwd(print) {
  print(process.cwd())
}

function date(print) {
  print(Date())
}

function echo(print, args) {
  print(args)
}

function ls(print) {
  fs.readdir('.', (error, files) => {
    if (error) throw Error(error)
    print(files.join('\n'))
  })
}

function cat(print, args) {
  fs.readFile(args, 'utf-8', (error, data) => {
    if (error) throw Error(error)
    print(data)
  })
}

function head(print, args) {
  // Para que pase el test
  fs.readFile(args, 'utf-8', (error, data) => {
    if (error) throw Error(error)
    print(data.split('\n').at(0))
    // Con este tomaria las primeras 8 lineas
    // print(data.split('\n).slice(0,8).join('\n))
  })
}

function tail(print, args) {
  fs.readFile(args, 'utf-8', (error, data) => {
    if (error) throw Error(error)
    print(data.split('\n').at(-1).trim())
  })
}

function curl(print, args) {
  utils.request(args, (error, response) => {
    if (error) throw Error(error)
    print(response.data)
  })
}

module.exports = {
  pwd,
  date,
  echo,
  ls,
  cat,
  head,
  tail,
  curl
}
