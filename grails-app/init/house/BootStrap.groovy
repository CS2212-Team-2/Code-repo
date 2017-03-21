package house
/**
 * Created by gtohill on 16/02/17.
 */
class BootStrap {
    def init = { servletContext ->
        //ADD HOUSE
        House testHouse = new House(houseName: '1stHouse', houseId: '1').save()


        //Add person

        Person testPerson1 = new Person(firstName:'Gary', lastName:'Tohill', subId:'107726694172578448865', email:'johnhend1974@gmail.com').save()
        Person testPerson2 = new Person(firstName: 'Rupi', lastName: 'Bains', subId: '11256632556454563', email:'rupi@gmail.com').save()
        Person testPerson3 = new Person(firstName: 'Mark', lastName: 'Johnson', subId: '11002002022004', email:'mark@gmail.com').save()


        /*new Person(firstName: 'Waylan', lastName: 'Smithers', sub_id: '115', houseId: '001').save()
        new Person(firstName: 'Bart', lastName: 'Simpson', sub_id: '116', houseId: '002').save()
        new Person(firstName: 'Homer', lastName: 'Simpson', sub_id: '117', houseId: '002').save()
        new Person(firstName: 'Marge', lastName: 'Simpson', sub_id: '118', houseId: '002').save()
        new Person(firstName: 'Lisa', lastName: 'Simpson', sub_id: '119', houseId: '002').save()*/


        //add house and person to PersonHouse table
        PersonHouse testPersonHouse1 = new PersonHouse(personId: testPerson1.subId, houseId:testHouse.houseId).save()
        PersonHouse testPersonHouse2 = new PersonHouse(personId:testPerson2.subId, houseId:testHouse.houseId).save()
        PersonHouse testPersonHouse3 = new PersonHouse(personId: testPerson3.subId, houseId:testHouse.houseId).save()

        Date today = new Date().minus(120)

        Transaction trans1 = new Transaction(invoiceId:1, houseId:1,creditorId:'107726694172578448865', debitorId:'11256632556454563', creditorName: 'Gary', debitorName: 'Rupi', amountPaid: 100, amountOwed: 50, description: 'Groceries', date:today).save()
        Transaction trans2 = new Transaction(invoiceId:2, houseId:1,creditorId:'11256632556454563', debitorId:'107726694172578448865', creditorName: 'Rupi', debitorName: 'Gary', amountPaid: 80, amountOwed: 35, description: 'Hydro', date:today).save()
        Transaction trans3 = new Transaction(invoiceId:3, houseId:1,creditorId:'11002002022004', debitorId:'107726694172578448865', creditorName: 'Mark', debitorName: 'Gary', amountPaid: 120, amountOwed: 55, description: 'LCBO', date:today).save()
        Transaction trans4 = new Transaction(invoiceId:4, houseId:1,creditorId:'107726694172578448865', debitorId:'11002002022004', creditorName: 'Gary', debitorName: 'Mark', amountPaid: 60, amountOwed: 40, description: 'KEG', date:today).save()
        Transaction trans5 = new Transaction(invoiceId:5, houseId:1,creditorId:'11256632556454563', debitorId:'107726694172578448865', creditorName: 'Rupi', debitorName: 'Gary', amountPaid: 44, amountOwed: 22, description: 'Phone-Bell', date:today).save()

        Score scorePerson1 = new Score(subId: testPerson1.subId, firstName: testPerson1.firstName, lastName: testPerson1.lastName, houseId:1).save()
        Score scorePerson2 = new Score(subId: testPerson2.subId, firstName: testPerson2.firstName, lastName: testPerson2.lastName, houseId:1).save()
        Score scorePerson3 = new Score(subId: testPerson3.subId, firstName: testPerson3.firstName, lastName: testPerson3.lastName, houseId:1).save()

        Post post = new Post(senderName: testPerson2.firstName, title: "Title of post",
                text: "aifbviqhbvkjsvnhnhv bhvbjjjahebv", date: (new Date()).getTimeString())
        post.save()
        testPerson1.addToPosts(post).save()
        testPerson3.addToPosts(post).save()
    }

    def destroy = {
    }
}
