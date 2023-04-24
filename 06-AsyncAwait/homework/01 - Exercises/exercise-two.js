'use strict'

const exerciseUtils = require('./utils')

const args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase()
})

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC,
  problemDx: problemD
}

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  const problem = module.exports['problem' + arg]
  if (problem) problem()
})

async function problemA() {
  // callback version
  exerciseUtils.readFile('poem-one/stanza-01.txt', function (err, stanza) {
    exerciseUtils.blue(stanza)
  })
  exerciseUtils.readFile('poem-one/stanza-02.txt', function (err, stanza) {
    exerciseUtils.blue(stanza)
  })

  // // Async Await version
  // const stanza01 = await exerciseUtils.promisifiedReadFile(
  //   'poem-two/stanza-01.txt'
  // )
  // exerciseUtils.blue(stanza01)

  // const stanza02 = await exerciseUtils.promisifiedReadFile(
  //   'poem-two/stanza-02.txt'
  // )
  // exerciseUtils.blue(stanza02)
  // console.log('done')

  // Optimized Async Await version
  const files = [1, 2].map((n) =>
    exerciseUtils.promisifiedReadFile(`poem-two/stanza-0${n}.txt`)
  )

  const stanzas = await Promise.all(files)
  stanzas.forEach((stanza) => exerciseUtils.blue(stanza))
  console.log('done')
}

async function problemB() {
  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt'
  })

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza)
    })
  })

  // Async Await version
  const files = [1, 2, 3, 4, 5, 6, 7, 8].map((n) =>
    exerciseUtils.promisifiedReadFile(`poem-two/stanza-0${n}.txt`)
  )
  const stanzas = await Promise.all(files)
  stanzas.forEach((stanza) => exerciseUtils.blue(stanza))
  console.log('done')
}

async function problemC() {
  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt'
  })

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza)
    })
  })

  // Async Await version
  await problemB()
}

async function problemD() {
  const filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt'
  })
  const randIdx = Math.floor(Math.random() * filenames.length)
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt'

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza)
      if (err) exerciseUtils.magenta(new Error(err))
    })
  })

  // Async Await version
  try {
    await problemB()
  } catch (error) {
    exerciseUtils.magenta(error)
  } finally {
    console.log('done')
  }
}
