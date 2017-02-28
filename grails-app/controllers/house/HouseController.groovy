package house

class HouseController {

    def index() {
        //check if user has valid session
        if(session['subId']) {
            def mess = params['message']
            def person = params['person']
            String[] p = person.split(',')
            Person per = new Person()
            per.sub_id = p[0]
            per.firstName = p[2]
            [message: mess, person: per]
        }
        else{
            redirect(action:'/')
        }
    }
    //direct method from controller: person, action:saveperson().  Method creates a new house
    def createhouse(){
        if(session['subId']) {
            def count = (House.count() + 1).toString()
            [idNumber: count]
        }else{
            redirect(url:'/')
        }
    }

    //redirect method from login - controller takes person to their house
    def myHouse() {
        if (session['subId']) {
            [persons: session]
        }else{
            redirect(url:'/')
        }
    }
    //from createhouse.gsp
    def save(){
        if(session['subId']) {
            def house = new House(params)
            house.save()                             //save house to House table
            PersonHouse ph = new PersonHouse(personId: session['subId'], houseId:house.id)
            ph.save()                               //save personhouse to PersonHouse Table
            session['houseId'] = house.id
            session['houseName'] = house.houseName
            redirect(action: 'addroommate', params:[message:"You successfully created a house!"])
        }else{
            redirect(url:'/')
        }
    }

    def addroommate(){
        if(session['subId']) {
            [message: params['message']]
        }else{

        }
    }

    //method sends email to roommates added by house creator
    def sendLink(){
        render "Success"
        if(session['subId']) {
            def items = params
            //send email to roommates
            def message = "Hello ${session['firstName']}! Your house # is ${session['houseId']}"
            redirect(action:'addroommate')
        }else{
            redirect(url:'/')
        }
    }
    //CONSIDER DELETING
    def personsave(){
        def person = new Person(params)
        person.save()
        render (view:"save.gsp")
    }


    def completed(){
        render "Completed"
    }

    def houselist(){
        //use for getting list of all houses
        def list = House.list()
        render "House id: ${list.id}"
        render ",  House Name: ${list.houseName}"
    }
    def count(){
        def housecount = House.count()
        render housecount
    }
}
