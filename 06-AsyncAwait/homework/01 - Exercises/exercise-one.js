/*********** Yo explico `exerciseUtils` ********
 *
 * excersiceUtils es una variable que viene de un archivo en este repo
 * El archivo `./utils` esta en este nivel y se llama `utils.js`
 *
 * Este archivo crea un `promisifiedReadFile` - FIJATE EN ÉL!!!
 *
 * Las funciones `blue` y `magenta` para mantener tu código DRY
 *
 ***********************************************/

'use strict'

const exerciseUtils = require('./utils')

const args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase()
})

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF
}

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  const problem = module.exports['problem' + arg]
  if (problem) problem()
})

async function problemA() {
  // callback version
  exerciseUtils.readFile('poem-one/stanza-01.txt', function (err, stanza) {
    console.log('-- A. callback version --')
    exerciseUtils.blue(stanza)
  })

  // Async Await version
  const poem = await exerciseUtils.promisifiedReadFile('poem-one/stanza-01.txt')
  exerciseUtils.blue(poem)
}

async function problemB() {
  // callback version
  exerciseUtils.readFile('poem-one/stanza-02.txt', function (err, stanza2) {
    console.log('-- B. callback version (stanza two) --')
    exerciseUtils.blue(stanza2)
  })
  exerciseUtils.readFile('poem-one/stanza-03.txt', function (err, stanza3) {
    console.log('-- B. callback version (stanza three) --')
    exerciseUtils.blue(stanza3)
  })

  // // Async Await version
  // const stanza02 = await exerciseUtils.promisifiedReadFile(
  //   'poem-one/stanza-02.txt'
  // )
  // const stanza03 = await exerciseUtils.promisifiedReadFile(
  //   'poem-one/stanza-03.txt'
  // )
  // exerciseUtils.blue(stanza02)
  // exerciseUtils.blue(stanza03)

  // Optimized Async Await version
  const files = [2, 3].map((n) =>
    exerciseUtils.promisifiedReadFile(`poem-one/stanza-0${n}.txt`)
  )
  const stanzas = await Promise.all(files)
  stanzas.forEach((stanza) => exerciseUtils.blue(stanza))
}

async function problemC() {
  // // callback version
  // exerciseUtils.readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   console.log('-- C. callback version (stanza two) --')
  //   exerciseUtils.blue(stanza2)
  //   exerciseUtils.readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //     console.log('-- C. callback version (stanza three) --')
  //     exerciseUtils.blue(stanza3)
  //     console.log('-- C. callback version done --')
  //   })
  // })

  // // Async Await version
  // const stanza02 = await exerciseUtils.promisifiedReadFile(
  //   'poem-one/stanza-02.txt'
  // )
  // exerciseUtils.blue(stanza02)
  // const stanza03 = await exerciseUtils.promisifiedReadFile(
  //   'poem-one/stanza-03.txt'
  // )
  // exerciseUtils.blue(stanza03)
  // exerciseUtils.blue('done')

  // // Optimized Async Await version
  // const files = [2, 3].map((n) =>
  //   exerciseUtils.promisifiedReadFile(`poem-one/stanza-0${n}.txt`)
  // )
  // const stanzas = await Promise.all(files)

  // stanzas.forEach((stanza) => exerciseUtils.blue(stanza))
  await problemB()
}

async function problemD() {
  // callback version
  exerciseUtils.readFile(
    'poem-one/wrong-file-name.txt',
    function (err, stanza4) {
      console.log('-- D. callback version (stanza four) --')
      if (err) exerciseUtils.magenta(new Error(err))
      else exerciseUtils.blue(stanza4)
    }
  )

  // Async Await version
  try {
    const stanza04 = await exerciseUtils.promisifiedReadFile(
      'poem-one/stanza04.txt'
    )
    exerciseUtils.blue(stanza04)
  } catch (error) {
    exerciseUtils.magenta(error)
  }
}

async function problemE() {
  // callback version
  exerciseUtils.readFile('poem-one/stanza-03.txt', function (err, stanza3) {
    console.log('-- E. callback version (stanza three) --')
    if (err) return exerciseUtils.magenta(new Error(err))
    exerciseUtils.blue(stanza3)
    exerciseUtils.readFile(
      'poem-one/wrong-file-name.txt',
      function (err2, stanza4) {
        console.log('-- E. callback version (stanza four) --')
        if (err2) return exerciseUtils.magenta(err2)
        exerciseUtils.blue(stanza4)
      }
    )
  })

  // Async Await version
  try {
    const stanza03 = await exerciseUtils.promisifiedReadFile(
      'poem-one/stanza-03.txt'
    )
    exerciseUtils.blue(stanza03)

    const stanza04 = await exerciseUtils.promisifiedReadFile(
      'poem-one/wrong-file-name.txt'
    )
    exerciseUtils.blue(stanza04)
  } catch (error) {
    exerciseUtils.magenta(error)
  }
}

async function problemF() {
  // callback version
  exerciseUtils.readFile('poem-one/stanza-03.txt', function (err, stanza3) {
    console.log('-- F. callback version (stanza three) --')
    if (err) {
      if (err) exerciseUtils.magenta(new Error(err))
      console.log('-- F. callback version done --')
      return
    }
    exerciseUtils.blue(stanza3)
    exerciseUtils.readFile(
      'poem-one/wrong-file-name.txt',
      function (err2, stanza4) {
        console.log('-- F. callback version (stanza four) --')
        if (err2) exerciseUtils.magenta(new Error(err2))
        else exerciseUtils.blue(stanza4)
        console.log('-- F. callback version done --')
      }
    )
  })

  // Async Await version
  try {
    const stanza03 = await exerciseUtils.promisifiedReadFile(
      'poem-one/stanza03.txt'
    )
    exerciseUtils.blue(stanza03)

    const stanza04 = await exerciseUtils.promisifiedReadFile(
      'poem-one/wrong-file-name.txt'
    )
    exerciseUtils.blue(stanza04)
  } catch (error) {
    exerciseUtils.magenta(error)
  } finally {
    console.log('done')
  }
}
