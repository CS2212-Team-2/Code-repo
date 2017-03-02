<!DOCTYPE html>
<html>
<head>
    <title>Welcome Home!</title>
</head>
<body>
    <div style="">
        <h5>Welcome Home: ${user}</h5>
    </div>
    <br/><br/>
    <div>
        <g:form controller="PersonHouse" action="logout">
            <g:submitButton name="logout" controller="PersonHouse" action="logout" value="logout" />
        </g:form>
    </div>
    <br/>
    <div>
        <g:each in="${persons}" var="item">
            <br/>
            <div>
                <g:each in="${item}" var="subItem">
                    Name: ${subItem[0]}<br/>
                    email: ${subItem[1]}<br/>
                </g:each>
            </div>
        </g:each>
    </div>
</body>
</html>