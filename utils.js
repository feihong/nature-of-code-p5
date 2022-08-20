function autoBindMethods(s) {
  const proto = Object.getPrototypeOf(s)
  for (const name of Object.getOwnPropertyNames(proto)) {
    const thing = proto[name]
    if (typeof thing === 'function') {
      s[name] = thing.bind(s)
    }
  }
  return s
}

function addExample(scriptName) {
  const jsFile = './' + scriptName + '.js'
  return import(jsFile).then(mod => {
    const h2 = document.createElement('h2')
    h2.textContent = mod.name
    document.body.appendChild(h2)

    const div = document.createElement('div')
    div.id = mod.name
    document.body.appendChild(div)

    new p5(s => {
      autoBindMethods(s)
      mod.default(s)
    }, div)

    return
  })
}

function addExamples_([first, ...rest]) {
  addExample(first).then(() => {
    if (rest.length > 0) {
      addExamples_(rest)
    }
  })
}

function addExamples(...scriptNames) {
  addExamples_(scriptNames)
}
