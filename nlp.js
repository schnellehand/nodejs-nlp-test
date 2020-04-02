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
    /**
     * TODO?
     * return { text, topic, nlpObject }
     */
    return query.join("/").replace('?', '')
}

module.exports = {
    parse
}