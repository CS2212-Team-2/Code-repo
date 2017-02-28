package house
/**
 * Created by gtohill on 16/02/17.
 */
class BootStrap {
    def init = { servletContext ->
        //ADD HOUSE
        House testHouse = new House(houseName: '1stHouse', houseId: '000').save()


        //Add person

        Person testPerson = new Person(firstName:'Gary', lastName:'Tohill', subId:'107726694172578448865', email:'johnhend1974@gmail.com').save()
        /*new Person(firstName: 'Rupi', lastName: 'Bains', sub_id: '113', houseId: '000').save()
        new Person(firstName: 'Mark', lastName: 'Johnson', sub_id: '114', houseId: '001').save()
        new Person(firstName: 'Waylan', lastName: 'Smithers', sub_id: '115', houseId: '001').save()
        new Person(firstName: 'Bart', lastName: 'Simpson', sub_id: '116', houseId: '002').save()
        new Person(firstName: 'Homer', lastName: 'Simpson', sub_id: '117', houseId: '002').save()
        new Person(firstName: 'Marge', lastName: 'Simpson', sub_id: '118', houseId: '002').save()
        new Person(firstName: 'Lisa', lastName: 'Simpson', sub_id: '119', houseId: '002').save()*/


        //add house and person to PersonHouse table
        PersonHouse testPersonHouse = new PersonHouse(personId: testPerson.subId, houseId:testHouse.houseId).save()

    }

    def destroy = {
    }
}
