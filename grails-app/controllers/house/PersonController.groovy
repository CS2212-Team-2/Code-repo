package house

class PersonController {
    //list persons in Person database
    def index() {
        def persons = Person.list()
        [person: persons]
    }

    //returns authentication data
    def results() {
        if (params.retId != null) {
            String subId = params.retId
            String[] list = subId.split(',')
            redirect(action: 'myHouse', controller: 'house', params: params)
        } else {
            redirect(action: 'createperson')
        }
    }

    //create new person based on google Id
    def createperson() {
        def googleProfile = params.googleProfile
        if(!googleProfile.equals(',,,')) {
            String[] p = googleProfile.split(',')
            session['firstName'] = p[0]
            session['lastName'] = p[1]
            session['subId'] = p[2]
            session['email'] = p[3]

            [person: session]
        }else{
            def message ="IMPORTANT You need to log into google to access this app"
            redirect (uri:'/', params:[message:"IMPORTANT You need to log into google to access this app"])
        }

    }
    //save new Person based on google Id
    def saveperson() {
        def person = new Person(params)
        def list = Person.list()

        if (person.subId in list.subId) {
            render "Person is in the database"
        } else {
            person.save()           //add person to Person Table
            session['subId'] = person.subId
            redirect(action: 'createhouse', controller: 'house')
            /*def person1 = Person.executeQuery(
                    "SELECT p.firstName, p.lastName, p.sub_id " +
                            "FROM Person p " +
                            "WHERE p.sub_id = ${person.sub_id} ")
            LinkedList<String> list = new LinkedList<String>()
            String[] p = person1[0]
            for (int i = 0; i < p.length; i++) {
                String z = p[i]
                list.add(z)
            }
            [lists: list]*/
        }
    }


    def authenticate() {
        //get user google OAuth information
        def auth = params.retId

        try {
            String[] list = auth.split(',')
            String authId = list[0]
            def person = Person.executeQuery(
                    "SELECT p.firstName, p.lastName, p.subId " +
                            "FROM Person p  " +
                            "WHERE p.subId = '${authId}' ")

            String[] p = person[0]

            if (!(authId in p)) {
                //person is not in database
                redirect(action: 'index', controller: 'house',
                        params: [message: "Please Create or Join a House", person: auth])
            } else {
                chain(action: 'myHouse', controller: 'house', model: [object: p])

                }
            }
            catch (Exception ex) {
            render "You are not signed into your Google Account. Please sign-in to google to proceed"
        }
    }

}


