'use strict'

const exerciseUtils = require('./utils')

const args = process.argv.slice(2).map((st) => st.toUpperCase())

module.exports = {
  problemAx: problemA,
  problemBx: problemB
}

// corre cada problema dado como un argumento del command-line para procesar
args.forEach((arg) => {
  const problem = module.exports['problem' + arg]
  if (problem) problem()
})

function problemA() {
  // // callback version
  // exerciseUtils.readFile('poem-two/stanza-01.txt', function (err, stanza) {
  //   exerciseUtils.blue(stanza)
  // })
  // exerciseUtils.readFile('poem-two/stanza-02.txt', function (err, stanza) {
  //   exerciseUtils.blue(stanza)
  // })

  // // Promise version
  // const stanza01 = exerciseUtils
  //   .promisifiedReadFile('poem-two/stanza-01.txt')
  //   .then((res) => exerciseUtils.blue(res))
  // const stanza02 = exerciseUtils
  //   .promisifiedReadFile('poem-two/stanza-02.txt')
  //   .then((res) => exerciseUtils.blue(res))
  //
  // Promise.all([stanza01, stanza02]).then(() => exerciseUtils.blue('done'))

  // Optimized Promise version
  const files = [1, 2].map((n) => `poem-two/stanza-0${n}.txt`)
  files.forEach((file) => {
    exerciseUtils
      .promisifiedReadFile(file)
      .then((res) => exerciseUtils.blue(res))
      .catch((err) => exerciseUtils.magenta(err))
  })

  Promise.all(files).then(() => exerciseUtils.blue('done'))
}

function problemB() {
  // const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
  //   return 'poem-two/' + 'stanza-0' + n + '.txt'
  // })
  // const randIdx = Math.floor(Math.random() * filenames.length)
  // filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt'

  // // callback version
  // filenames.forEach((filename) => {
  //   exerciseUtils.readFile(filename, function (err, stanza) {
  //     exerciseUtils.blue(stanza)
  //     if (err) exerciseUtils.magenta(new Error(err))
  //   })
  // })

  // promise version
  const files = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `poem-two/stanza-0${n}.txt`)
  files.forEach((file) => {
    exerciseUtils
      .promisifiedReadFile(file)
      .then((res) => exerciseUtils.blue(res))
      .catch((err) => exerciseUtils.magenta(err))
  })

  //   const stanza01 = exerciseUtils
  //     .promisifiedReadFile('poem-two/stanza-01.txt')
  //     .then((res) => exerciseUtils.blue(res))
  //   const stanza02 = exerciseUtils
  //     .promisifiedReadFile('poem-two/stanza-02.txt')
  //     .then((res) => exerciseUtils.blue(res))
  //   const stanza03 = exerciseUtils
  //     .promisifiedReadFile('poem-two/stanza-03.txt')
  //     .then((res) => exerciseUtils.blue(res))
  //   const stanza04 = exerciseUtils
  //     .promisifiedReadFile('poem-two/stanza-04.txt')
  //     .then((res) => exerciseUtils.blue(res))
  //   const stanza05 = exerciseUtils
  //     .promisifiedReadFile('poem-two/stanza-05.txt')
  //     .then((res) => exerciseUtils.blue(res))
  //   const stanza06 = exerciseUtils
  //     .promisifiedReadFile('poem-two/stanza-06.txt')
  //     .then((res) => exerciseUtils.blue(res))
  //   const stanza07 = exerciseUtils
  //     .promisifiedReadFile('poem-two/stanza-07.txt')
  //     .then((res) => exerciseUtils.blue(res))
  //   const stanza08 = exerciseUtils
  //     .promisifiedReadFile('poem-two/stanza-08.txt')
  //     .then((res) => exerciseUtils.blue(res))

  //   Promise.all([
  //     stanza01,
  //     stanza02,
  //     stanza03,
  //     stanza04,
  //     stanza05,
  //     stanza06,
  //     stanza07,
  //     stanza08
  //   ])
  //     .then(() => 'done')
  //     .catch((err) => exerciseUtils.magenta(err))
}

// utils.promisifiedReadFile = function (filename) {
//   return new Promise(function (resolve, reject) {
//     let readFileSync = fs.readFileSync(filename)
//     if (!readFileSync) return reject('File not found')
//     resolve(readFileSync.toString())
//   })
// }

// EJERCICIO EXTRA
const problemC = (file, str) => {
  const fs = require('fs')

  const promisifiedWriteFile = (file, str) => {
    return new Promise((resolve, reject) =>
      fs.writeFile(file, str, (err) => (err ? reject(err) : resolve()))
    )
  }

  promisifiedWriteFile(file, str)
    .then(() => console.log(`${file} written successfully with ${str}!`))
    .catch((err) => console.err(`Error writing file: ${err}`))
}

// Use example:
problemC('script.py', 'Nuke')
