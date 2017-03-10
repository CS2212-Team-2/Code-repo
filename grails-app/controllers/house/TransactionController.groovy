package house

class TransactionController {

    def index() {

        //section gets total only
        def creditor = Transaction.executeQuery("SELECT p.invoiceId, p.houseId, p.creditorId, p.debitorId, p.creditorName, " +
                "p.debitorName, p.amountPaid, p.amountOwed, p.description, p.date " +
                "FROM Transaction p " +
                "WHERE p.creditorId = '107726694172578448865' "
        )

        def debitor = Transaction.executeQuery("SELECT p.invoiceId, p.houseId, p.creditorId, p.debitorId, p.creditorName, " +
                "p.debitorName, p.amountPaid, p.amountOwed, p.description, p.date " +
                "FROM Transaction p " +
                "WHERE p.debitorId = '107726694172578448865' ")


        def totalCredit = 0
        int len = creditor.size()
        //String[] creditList = new String[len];
        for(int y = 0; y < creditor.size(); y++) {
            String[] creditList = creditor[y]
            int creditAmount = creditList[7].toInteger()
            totalCredit = totalCredit + creditAmount
        }

        def totalDebit = 0
        //String[] creditList = new String[len];
        for(int y = 0; y < debitor.size(); y++) {
            String[] debitList = debitor[y]
            int debitAmount = debitList[7].toInteger()
            totalDebit = totalDebit + debitAmount
        }

        int total = (totalCredit -totalDebit) //total to be returned to front end


        //total section ends
        //SECTION: get individual transactions
        session['subId'] = '107726694172578448865'
        String[] subIdList= ['107726694172578448865','11256632556454563','11002002022004']
        String[] newList = new String[subIdList.size()]
        int n = 0
        //remove duplicate subId
        for(String w: subIdList){
            if(session['subId'] != w){
                newList[n] = w
            }
            n++
        }
        def listOfCreditDebit = Transaction.executeQuery("SELECT p.invoiceId, p.houseId, p.creditorId, p.debitorId, p.creditorName, " +
                "p.debitorName, p.amountPaid, p.amountOwed, p.description, p.date " +
                "FROM Transaction p " +
                "WHERE (p.debitorId = '107726694172578448865' AND p.creditorId='11256632556454563') OR (p.creditorId = '107726694172578448865' AND p.debitorId='11256632556454563') " )

        int size = listOfCreditDebit.size()
        Transaction[] list = new Transaction[size]
        for(int i = 0; i < listOfCreditDebit.size(); i++){
            String[] transList = listOfCreditDebit[i]
            int invoiceId = transList[0].toInteger()
            int houseId = transList[1].toInteger()
            String creditorId = transList[2]
            String debitorId = transList[3]
            String creditorName = transList[4]
            String debitorName = transList[5]
            int amountPaid = transList[6].toInteger()
            int amountOwed = transList[7].toInteger()
            String description = transList[8]
            String date = transList[9]
            def trans = [invoiceId:invoiceId, houseId:houseId, creditorId:creditorId, debitorId:debitorId, creditorName:creditorName,
                         debitorName:debitorName, amountPaid:amountPaid, amountOwed:amountOwed, description:description, date:date]

            list[i] = trans

        }


        [transactions:list]

    }

    def transaction(){

    }
}
