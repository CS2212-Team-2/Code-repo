<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Welcome Home!</title>
    <asset:javascript src="index.bundle.js"/>

</head>
<body>
    <div id="root" data-title="userName" data-name= ${user}></div>

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

    <asset:javascript src="index.bundle.js"/>

</body>
</html>