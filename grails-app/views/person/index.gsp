<!DOCTYPE>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Persons in Person Database</title>
</head>
<body>
<div>
    <g:each in="${person}" var="per" status="i">
        <h3>${i+1}. ${per.lastName}, ${per.firstName}</h3>
        <p>
            sub_ID: ${per.subId}, email: ${per.email}
        </p>
        <br/>
    </g:each>
</div>
</body>


</html>