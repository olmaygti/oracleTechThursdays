<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main"/>
        <title>Groovy Introduction</title>
    </head>
    <body>
        <div class="reveal">
            <div class="slides">
                <section data-ng-repeat="slide in slides" data-ng-include src="'slides/' + slide + '.html'">
                </section>
            </div>
        </div>
    </body>
</html>
