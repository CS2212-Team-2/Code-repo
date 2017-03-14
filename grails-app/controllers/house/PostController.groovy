package house

import grails.rest.RestfulController

class PostController extends RestfulController {

    static responseFormats = ['json', 'xml']

    PostController() {
        super(Post)
    }

    def index() { }

    def getPosts(){
        def subId = params.subId.trim()
        Person person = Person.findBySubId(subId)
        print(person.getFirstName())

        if(person!=null){
            respond person.getPosts()
        }
        else{
            response.status = 404
        }

    }

    def addPost(){
        def senderId = params.subId
        def title = params.title
        def text = params.text
        def date = params.date
        println("post recieved")
        println("this is wat i got " + params )

        List<String> receiversId = params.receivers.split(",")//list of subIds related it to
        println("list:                 " + receiversId)
        Person person
        Post post = new Post(sender: Person.findBySubId(senderId).getFirstName(),
                title: title, text: text, date: date).save()

        for(int i = 0; i<receiversId.size(); i++)
        {

            person = Person.findById(receiversId[i])
            println("\n\n person new:   " + person.id)
            person.addToPosts(post)

        }
        response.status = 200

    }

}
