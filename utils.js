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

async function addExample(scriptName) {
  const jsFile = './' + scriptName + '.js'
  const module = await import(jsFile)

  const anchor = document.createElement('a')
  anchor.setAttribute('name', scriptName)
  document.body.appendChild(anchor)

  const h2 = document.createElement('h2')
  h2.textContent = module.name
  anchor.appendChild(h2)

  const div = document.createElement('div')
  div.id = scriptName
  document.body.appendChild(div)

  new p5(s => {
    autoBindMethods(s)
    module.default(s)
  }, div)

  return { name: scriptName, title: module.name }
}

async function addExamples(...scriptNames) {
  const examples = []

  for (const scriptName of scriptNames) {
    const example = await addExample(scriptName)
    examples.push(example)
  }

  const toc = document.createElement('ul')
  document.body.prepend(toc)

  for (const example of examples) {
    const li = document.createElement('li')
    li.innerHTML = `<a href="#${example.name}">${example.title}</a>`
    toc.appendChild(li)
  }
}

