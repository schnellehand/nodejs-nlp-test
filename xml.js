const builder = require('xmlbuilder')
const { process, parse } = require('./nlp')

function spreadSubjects() {

}

function spreadPhrases() {

}

function spreadEntities() {

}

function buildXML(str) {
    const parsed = parse(str, true)
    console.log(parsed.obj)
    const hier = {
        QIRQuery: {
            OriginalQuery: str,
            Dependency: {
                root: {
                    root_val: "is",
                    nsubj: {
                        nsubj_val: parsed.obj.target,
                        amod: {
                            amod_val: parsed.obj.adj
                        },
                        prep: {
                            prep_val: parsed.obj.prep,
                            pobj: {
                                pobj_val: parsed.obj.range
                            }
                        }
                    }
                }
            },
            NounPhrase: {

            },
            Entities: {
                Entity: [...parsed.topic.replace("QIREQ/", "").split("/")]
            }
        }
    }
    return { topic: parsed.topic, xml: builder.create(hier).end({ pretty: true }) }
}

module.exports = {
    buildXML
}