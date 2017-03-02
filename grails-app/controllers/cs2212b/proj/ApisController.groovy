package cs2212b.proj

import grails.rest.RestfulController

class ApisController extends RestfulController{

    static responseFormats = ['json', 'xml']

    ApisController() {
        super(Leaderboard)
    }

    def getMembersList() {
        print("Request received")
        def list = ["john", "bill", "bobby","jessica"]
        respond list

    }

    //IN HERE PLEASE CALL THE INVITE MEMBER FUNCTION
    //MAKE SURE HE IS NOT ALREADY IN THE HOUSE
    def receiveEmail(){
        print("\n\n successfully in controller")
        def email = params.email
        println(email)
        //if success
        response.status = 200
        //else failed
        //response.status = 500

    }

    def getInfo(){
        print("Info request received")
        //make  a call to the user info

        def person = new Person(firstName: "bob", lastName: "smith", email: "lol@lol.com")
        respond person
    }

    def index() {

    }


}
