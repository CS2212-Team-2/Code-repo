<!DOCTYPE html>
<html>
    <head>
        <title>Transactions</title>
    </head>
    <body>
        <div>
            <g:each in ="${list}" var ="person">
                <br/>
                <g:link action="index" controller = "transaction" id="${person.subId}">${person.firstName}</g:link>
            </g:each>
        </div>
    </body>
</html>