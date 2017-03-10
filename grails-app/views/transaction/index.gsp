<!DOCTYPE html>
<html>
<head>
    <title>Test Transactions</title>
</head>

<h2>Transactions</h2>
<div>
    <g:each in="${transactions}" var ="person">
        <h3>____________________________</h3>
        <p>${person.invoiceId}</p>
        <p>${person.houseId}</p>
        <p>${person.debitorName}</p>
        <p>${person.creditorName}</p>
        <p>${person.amountPaid}</p>
        <p>${person.amountOwed}</p>
        <p>${person.description}</p>
        <p>${person.date}</p>
    </g:each>
</div>

</html>
