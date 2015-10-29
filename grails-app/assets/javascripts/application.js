// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better 
// to create separate JavaScript files as needed.
//
//= require jquery
//= require ../bower/lodash/dist/lodash.min.js
//= require ../bower/angular/angular.min.js
//= require ../bower/reveal.js/js/reveal.js
//= require ../bower/reveal.js/lib/js/classList.js
//= require ../bower/reveal.js/lib/js/head.min.js
//= require ../bower/reveal.js/plugin/notes/notes.js
//= require ../bower/reveal.js/plugin/highlight/highlight.js
//= require_self

angular.module('OracleTechThursdays', [])
    .controller('SlidesController',[
        '$scope',
        '$http',
        '$timeout',
        function($scope, $http, $timeout) {

            $scope.slides = ['front_page','about_me', 'about_this', 'about_groovy', 'about_groovy2', 'java2groovy',
                'closures', 'groovy_types', 'groovy_truth', 'groovy_operators', 'multimethods', 'collections_api',
                'metaprogramming', 'mop', 'dsl', 'qa'];

            $scope.execute = function (index) {
                var code = angular.element('#code' + index).text();
                $http.post('api/execute', {code: code}).then(function success(result) {
                    $scope.result = result.data;
                }).catch(function error(error) {
                    $scope.result = error.data;
                });
            }

            $scope.contents = {
                6: "def myCollection = [1,2,3,4];\nmyCollection.each { println it};\ndef square = { it**2 };\nmyCollection.collect(square)",
                7: "def myVar = 'Oracle';\n[5.class, 5l.class, 'h'.class, true.class, 'Hello world!', '''\nmulti\nline\nstring'''.class, \"This is not a String $myVar\".class,\n[].class, [:].class]",
                12: "java.lang.Object.metaClass.methods",
                13: [
                        [
                            "class Test {",
                            "\tpublic String method() {",
                            "\t\t'foo'",
                            "\t}",
                        "}",
                        "new Test().method();",
                        ].join('\n'),
                        [
                            "class Test {",
                                "    public String method() {",
                                "        'foo'",
                                "    }",
                            "}",
                            'Test.metaClass.invokeMethod { name, args -> ',
                            '       println "Called ${name} with ${args}"',
                            '       def method = delegate.class.metaClass.getMetaMethod( name, args )',
                            '       if (method) {',
                            '               println "Found Method"',
                            '               return method.invoke( delegate, args)',
                            '       } else {',
                            '               throw new UnsupportedOperationException("Wrong name!")',
                            '       }',
                            '}',
                            "new Test().method();",
                        ].join('\n'),
                        [
                            "class Test {",
                                "    public String method() {",
                                "        'foo'",
                                "    }",
                                "    def methodMissing (String name, args) {",
                                "        println 'Missing Called'",
                                "        def impl = { new Random().nextInt(10) }",
                                "        Test.metaClass[name] = impl",
                                "        impl()",
                                "    }",
                            "}",
                            'Test.metaClass.invokeMethod { name, args -> ',
                            '       println "Called ${name} with ${args}"',
                            '       def method = delegate.class.metaClass.getMetaMethod( name, args )',
                            '       if (method) {',
                            '               println "Found Method"',
                            '               return method.invoke( delegate, args)',
                            '       } else {',
                            '               delegate.methodMissing(name, args)',
                            '       }',
                            '}',
                            "new Test().methodA();",
                        ].join('\n')
                    ],
                14: "import groovy.xml.*;\nnew MarkupBuilder().root {\n\ta( a1:'one' ) {\n\t\tb { 'test' }\n\t\tc( a2:'two', 'blah' )\n\t}\n}"
            }
          
            $timeout(function(){
                Reveal.initialize({
                    controls: true,
                    progress: true,
                    history: true,
                    center: true,
                    transition: 'concave', // none/fade/slide/convex/concave/zoom
                    // Optional reveal.js plugins
                    dependencies: [
                        { src: 'assets/reveal.js/plugin/highlight/highlight.js', async: true,callback: function() {
                                $scope.$apply(function () {
                                    hljs.initHighlighting();
                                });
                            } 
                        },
                        { src: 'assets/reveal.js/plugin/notes/notes.js', async: true }
                    ]
                });
            }, 1000);
        }
    ]
);
