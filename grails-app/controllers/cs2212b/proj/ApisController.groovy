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

    def index() {

    }


}
