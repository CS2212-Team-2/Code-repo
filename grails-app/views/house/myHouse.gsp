<!DOCTYPE html>
<html>
<head>
    <title>Welcome Home!</title>
</head>
<body>
<div>
    <h2>Welcome Home!</h2>
</div>
    <div>
        <g:each in="${persons}" var="item">
            <li>Hello ${item['subId']}</li>
            <!--<li>Your home: ${item['firstName']}</li>-->
        </g:each>
    </div>
    <div>
        <g:form controller="PersonHouse" action="logout">
            <g:submitButton name="logout" controller="PersonHouse" action="logout" value="logout" />
        </g:form>
    </div>
    <!--<div>
    <a href="http://localhost:8080/house/index" onclick="signOut();">Sign out</a>
        <script>
            function signOut() {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');

                });
                //window.location = "http://localhost:8080/";
            }

        </script>
    </div>-->
</body>

</html>