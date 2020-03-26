const nlp = require('compromise')
const natural = require('natural')

nlp.extend(require('compromise-numbers'))
nlp.extend(require('compromise-adjectives'))
nlp.extend(require('compromise-dates'))
nlp.extend(require('compromise-ngrams'))
nlp.extend(require('compromise-paragraphs'))
nlp.extend(require('compromise-sentences'))

function print(text) {
    let req = nlp(text)
    console.log("===================")
    //console.log(req.out('tags'))
    //console.log(req.normalize().map(e => e.out()))
    console.log(req.clauses().map(e => e.text()))
    console.log("===================")
    req.clauses().map(e => {
        console.log(e.out('tags'))
        console.log(e.sentences().subjects())
        console.log(e.nouns().adjectives())
        console.log("===================")
    })
}

const req1 = "Sensor report issued by nearest sensor"
const req2 = "Sensor report issued by sensor that have highest precision"
const req3 = "Track report issued by nearest unit"
const req4 = "Track report issued by A3 unit"

//print(req1)
print(req2)