<!DOCTYPE html>
<html>
<head>
    <title>Test Transactions</title>
</head>
    <body>
        <g:set var="user" value="${userId}" scope="page"/>

        <h2>Transactions</h2>
        <div>
            <g:each in="${transactions}" var ="person" status="i">
                <h3>____________________________</h3>
                <p>Date:        ${person.date}</p>
                <p>Invoice #:   ${person.invoiceId}, House #:${person.houseId} </p>
                <p>Creditor:    ${person.creditorName}</p>
                <p>Debitor:     ${person.debitorName}</p>
                <p>Total:       ${person.amountPaid}</p>
                <p>Amount Owed: ${person.amountOwed}</p>
                <g:if test="${person.debitorId == user}">
                    <g:form >
                        $<g:textField name="amount" value=""/>
                        <g:hiddenField name="invoiceNum" value="${person.invoiceId}" />
                        <g:actionSubmit action="payment" controller="transaction" value="Make Payment" />
                    </g:form>
                </g:if>
                <p>Description: ${person.description}</p>
            </g:each>
        </div>
    </body>
</html>
