const nlp = require('compromise')

nlp.extend(require('compromise-numbers'))
nlp.extend(require('compromise-adjectives'))
nlp.extend(require('compromise-dates'))
nlp.extend(require('compromise-ngrams'))
nlp.extend(require('compromise-paragraphs'))
nlp.extend(require('compromise-sentences'))
nlp.extend(require('compromise-syllables'))

function parse(text) {
    let req = nlp(text)
    const conditions = ["#QuestionWord", "#Copula", "#Superlative", "#Noun", "#Adjective"]
    const query = ["QIREQ"]

    conditions.forEach(elem => {
        if(req.has(elem) === false)
        return "Failed to parsing  requirement"
    })

    req.clauses().map(e => {
        const target = e.nouns().toSingular()
        const number = e.numbers()
        const adj = e.adjectives()
        console.log(e.out('tags'))
        console.log(e.nouns())
        if(target.found) {
            query.push(target.list[0].trim().text())
        }
        if(adj.found) {
            adj.forEach(elem => {
                query.push(elem.trim().text())
            })
        }
        if(number.found) {
            query.push("radius")
            query.push(number.list[0].trim().text())
        }
    })
    return query.join("/")
}

const req = [
    "Where is the nearest surgeons within 50km from here?",
    "What is the most dangerous unknown object from here?",
]

const text = req[process.argv[2] || 0]
const result = parse(text)

console.log(`${text} => ${result}`)

const pattern = /[^a-zA-Z0-9|\\?\s]+/gi;

console.log(pattern.test("Where is the nearest surgeons within 50km from here!"))
console.log(pattern.test("Where is the nearest surgeons within 50km from here?"))
console.log(pattern.test("Where is the nearest surgeons within 50km from here[]@?"))
console.log(pattern.test("Where is the nearest surgeons within 50km from here."))
console.log(pattern.test("Where is the nearest surgeons within 50km from 여기?"))