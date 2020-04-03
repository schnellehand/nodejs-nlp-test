const nlp = require('compromise')

nlp.extend(require('compromise-numbers'))
nlp.extend(require('compromise-adjectives'))
nlp.extend(require('compromise-dates'))
nlp.extend(require('compromise-ngrams'))
nlp.extend(require('compromise-paragraphs'))
nlp.extend(require('compromise-sentences'))
nlp.extend(require('compromise-syllables'))

function parse(text, retObj = false) {
    const req = nlp(text)
    const conditions = ["#QuestionWord", "#Copula", "#Superlative", "#Noun", "#Adjective"]
    const query = ["QIREQ"]
    const obj = {}

    conditions.forEach(elem => {
        if(req.has(elem) === false)
        return "Failed to parsing  requirement"
    })

    req.clauses().map(e => {
        const target = e.nouns().toSingular()
        const number = e.numbers()
        const adj = e.adjectives()
        const prep = e.prepositions()
        console.log(e.out('tags'))

        if(target.found) {
            const t = target.list[0].trim().text()
            obj.target = t
            query.push(t)
        }
        if(adj.found) {
            obj.adj = []
            adj.forEach(elem => {
                const a = elem.trim().text()
                obj.adj.push(a)
                query.push(a)
            })
        }
        if(number.found) {
            const n = number.list[0].trim().text()
            obj.range = []
            obj.range.push("radius")
            obj.range.push(n)
            query.push("radius")
            query.push(n)
        }
        if(prep.found) {
            obj.prep = prep.list[0].trim().text()
        }

        if(typeof obj.range === 'undefined') {
            obj.range = target.list[1].trim().text().replace("?", "") || "here"
        }
    })
    if(retObj === false) {
        return query.join("/").replace('?', '')
    } else {
        return { topic:query.join("/").replace('?', ''), obj }
    }
}

module.exports = {
    parse
}