package com.oracle.techthursdays

class ApiController  {

    static responseFormats = ['json']

    def execute() {
        def result
        println "\n\n"
        try {
            result = [output: Eval.me(request.JSON.code).toString()]
            println "----"
            println result
            println "----"
        }catch (Exception ex) {
            result = [error: ex.message]
            println "----"
            println ex.message
            println "----"
        }
        respond result
    }
}
