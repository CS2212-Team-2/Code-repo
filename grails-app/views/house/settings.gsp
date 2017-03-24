<!DOCTYPE html>
<html>
<head>
    <title>
        User Settings
    </title>
</head>
<body>
<h4><g:link  base="http://localHost:8080/house/myHouse?subId+%3D+${session['subId']}%0A++firstName+%3D+${[session['firstName']]}">Back To My House</g:link></h4>
<div>

    <g:img dir="images" file="${image}" width="40" height="40"/>

</div>
<div>
        <g:form controller="person" action="changeName">
            <label>First Name: </label>
            <g:textField name="firstName"/><br/>
            <label>Last Name:  </label>
            <g:textField name="lastName"/><br/>
            <g:hiddenField name="subId" value="${person.subId}"/><br/>
            <g:actionSubmit controller="person" action="changeName" value="Change Name"/>
        </g:form>
</div>
<div>

</div>
</body>
</html>