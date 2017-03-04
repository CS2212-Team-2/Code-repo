package house

import grails.rest.RestfulController

class EmailSenderController extends RestfulController{

    EmailSenderController() {
        super(Leaderboard)
    }

    def index() {
        String email = "Hello from HouseMates!  Your friend, ${session['firstName']}, is requesting that " +
                " you join HouseMates.  Please visit link http://localhost:8080/house/joinhouse. " +
                "You will be asked to authenticate your gmail account. After authentication, your gmail account infomation" +
                " will be used to to register your account. At that point, all you need to do is enter house number ${session['houseId']}. " +
                "" +
                "\n\n\nThank you from HouseMates!"

        [email:email]
    }

    def send() {
        sendMail {
            to params.address
            from "housemates2212@gmail.com"
            subject params.subject
            text params.body
        }

        flash.message = "Message sent at "+new Date() + "Please add another HouseMate"
        redirect action:"index"
    }

    def sendFromDashboard() {
        print("email controller" + params.address + "\n"+ params.subject + "\n" + params.body)
        sendMail {
            to params.address
            from "housemates2212@gmail.com"
            subject params.subject
            text (params.body + ", ${session['houseId']} \n\n\n Thank you from HouseMates!")
    }

        response.status = 200;
    }
}
