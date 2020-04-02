const builder = require('xmlbuilder')
const { parse } = require('./nlp')

function spreadSubjects() {

}

function spreadPhrases() {

}

function spreadEntities() {

}

function buildXML(str) {
    const parsed = parse(str)
    const hier = {
        QIRQuery: {
            OriginalQuery: str,
            Dependency: {
                root: {
                    root_val: "is",
                }
            },
            NounPhrase: {

            },
            Entities: {

            }
        }
    }
    return { topic: parsed, xml: builder.create(hier).end() }
}

module.exports = {
    buildXML
}