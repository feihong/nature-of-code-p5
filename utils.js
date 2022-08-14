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
  import('./' + scriptName + '.js').then(mod => {
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
  })
}

function addExamples(...scriptNames) {
  for (const scriptName of scriptNames) {
    addExample(scriptName)
  }
}
