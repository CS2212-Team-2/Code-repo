<!DOCTYPE html>
<html>
<head>
    <title>Transactions</title>
</head>
<body>
    <div>
        <g:form controller="transaction" action="index">
            <label>SubID User: </label>
            <g:textField name="userSubId"/><br/>
            <label>SubId House Member: </label>
            <g:textField name="memberSubId"/><br/>
            <g:actionSubmit controller='transaction' action='index' value="Send"/>
        </g:form>
    </div>
</body>
</html>