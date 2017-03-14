package house
import org.springframework.dao.*

class TransactionController {

    def index() {
        String userId = session['subId']
        String houseMemId = params.id

        //section gets total only
        /*def creditor = Transaction.executeQuery("SELECT p.invoiceId, p.houseId, p.creditorId, p.debitorId, p.creditorName, " +
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

        int total = (totalCredit -totalDebit) //total to be returned to front end*/

        //total section ends
        //SECTION: get individual transactions
        /*session['subId'] = '107726694172578448865'
        String[] subIdList= ['107726694172578448865','11256632556454563','11002002022004']*/
        //String[] newList = new String[subIdList.size()]
        //int n = 0
        //remove duplicate subId
        /*for(String w: subIdList){
            if(session['subId'] != w){
                newList[n] = w
            }
            n++
        }*/
        def listOfCreditDebit = Transaction.executeQuery("SELECT p.invoiceId, p.houseId, p.creditorId, p.debitorId, p.creditorName, " +
                "p.debitorName, p.amountPaid, p.amountOwed, p.description, p.date " +
                "FROM Transaction p " +
                "WHERE (p.debitorId = '${userId}' AND p.creditorId='${houseMemId}') OR (p.creditorId = '${userId}' AND p.debitorId='${houseMemId}') ")

        int size = listOfCreditDebit.size()
        Transaction[] list = new Transaction[size]
        for (int i = 0; i < listOfCreditDebit.size(); i++) {
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
            def trans = [invoiceId  : invoiceId, houseId: houseId, creditorId: creditorId, debitorId: debitorId, creditorName: creditorName,
                         debitorName: debitorName, amountPaid: amountPaid, amountOwed: amountOwed, description: description, date: date]

            list[i] = trans

        }
        [transactions: list, userId:session['subId']]
    }

    def transaction() {

        String userSubId = session['subId']
        String houseId = session['houseId']
        def list = PersonHouse.executeQuery("SELECT p.personId " +
                "FROM PersonHouse p " +
                "WHERE p.houseId = '${houseId}' ")

        //remove user from list

        String[] findSubId = new String[list.size() - 1]
        int k = 0
        for (int i = 0; i < list.size(); i++) {
            String id = list[i]
            if (userSubId != id) {
                findSubId[k] = id
                k++
            }
        }

        //search Person table for firstName based on subId from list
        //LinkedList<String> nameList = new LinkedList<String>()
        Person[] houseList = new Person[2]
        //String[] nameList = new String[findSubId.size()]
        for (int i = 0; i < findSubId.size(); i++) {
            String nameSubId = findSubId[i]
            def retPerson = Person.executeQuery("SELECT p.firstName, p.email, p.subId " +
                    "FROM Person p " +
                    "WHERE p.subId = '${nameSubId}'"
            )
            //nameList[i] = retPerson[0]
            //}
            //int size = retPerson.size()

            String[] retlist = retPerson[0]
            String firstname = retlist[0]
            String email = retlist[1]
            String subid = retlist[2]
            def houseMember = [firstName: firstname, email: email, subId: subid]
            houseList[i] = houseMember
        }

        [list: houseList]
    }

    def payment(){
        def paid = params.amount
        def invoice = params.invoiceNum

        def toPay = Transaction.get(invoice)
        if(toPay.amountOwed == paid.toInteger()){
            toPay.delete(flush:true)
            redirect(action:'transaction')

        }else{
            int amountPaid = toPay.amountOwed - paid.toInteger()
            render amountPaid
        }
    }

    def addpayment(){

    }
}
