const { parse } = require('./nlp')
const { buildXML } = require('./xml')
const req = [
    "Where is the nearest surgeons within 50km from here?",
    "What is the most dangerous unknown object from Seoul?",
]

const text = req[process.argv[2] || 0]
const topic = parse(text)
const msg = buildXML(text)

console.log(topic)
console.log(msg.topic)
console.log(msg.xml)

// const pattern = /[^a-zA-Z0-9|\\?\s]+/gi;
// console.log(pattern.test("Where is the nearest surgeons within 50km from here!"))
// console.log(pattern.test("Where is the nearest surgeons within 50km from here?"))
// console.log(pattern.test("Where is the nearest surgeons within 50km from here[]@?"))
// console.log(pattern.test("Where is the nearest surgeons within 50km from here."))
// console.log(pattern.test("Where is the nearest surgeons within 50km from 여기?"))