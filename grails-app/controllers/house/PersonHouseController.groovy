package house


class PersonHouseController {

    def index() {

    }

    def login() {
        def auth = params.googleProfile

        if(!auth.equals(',,,')) {
            String[] p = auth.split(',')
            String subId = p[2]

            def personHouse =  PersonHouse.executeQuery("SELECT p.personId, p.houseId " +
                    "FROM PersonHouse p  " +
                    "WHERE p.personId = '${subId}' ")

            if(personHouse[0] != '') {
                LinkedList<String> list = new LinkedList<String>()
                String[] pidHid = personHouse[0]
                String pid = pidHid[0]
                String hid = pidHid[1]
                def person = Person.list()
                if(pid in person.subId){
                    session['subId'] = pid
                    session['houseId'] = hid
                }
                redirect(action:'myHouse', controller:'house', params:[persons:session])
            }

        }else{
            redirect(uri:'/', params:[message:"IMPORTANT- Please login to google to access the app"])
        }
    }
    //end users session
    def logout() {
        session.invalidate()

        //session.invalidate()

        //redirect(action:'logout')
    }

    //redirect to login page
    def landing() {
        redirect(url: '/')
    }

    //fun with session

    def list() {
        if (session['subId']) {
            def list = PersonHouse.list()
            [list:list]
        } else {
            redirect(url:'/')
        }
    }
}
