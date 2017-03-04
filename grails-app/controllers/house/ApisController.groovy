package house

import grails.rest.RestfulController

class ApisController extends RestfulController{

    static responseFormats = ['json', 'xml']

    ApisController() {
        super(Leaderboard)
    }

//    def getMembersList() {
//        print("Request received")
//        Person.find(new Person())
//        def list = ["john", "bill", "bobby","jessica"]
//        respond list
//    }

    //IN HERE PLEASE CALL THE INVITE MEMBER FUNCTION
    //MAKE SURE HE IS NOT ALREADY IN THE HOUSE


//    def getInfo(){
//        print(session['subId'])
//        print("Info request received")
//        //make  a call to the user info
//
//        def person = new Person(firstName: session['firstName'], lastName: session['lastName'],
//                email: session['email'])
//        respond person
//    }

    def index() {
    }


}
