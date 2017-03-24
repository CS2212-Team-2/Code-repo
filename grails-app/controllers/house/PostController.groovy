package house

import grails.rest.RestfulController

class PostController extends RestfulController {

    static responseFormats = ['json', 'xml']

    PostController() {
        super(Post)
    }

    def index() { }

    def getPosts( ){
        def subId = params.subId.trim()
        Person person = Person.findBySubId(subId)
        print(person.getFirstName())
        println(" POSTS IN GET           " + person.getPosts() )

        println("\n\n\n ALL THE POSTS          " + Post.getAll() )
        //println("\n\n\n POST 3         " + Post.getAll().get(2).text )


        if(person!=null){

          //  println(person.getPosts().get(2).getText())

            respond person.getPosts()
        }
        else{
            response.status = 404
        }

    }

    def addPost( ){
        def senderId = params.subId
        def title = params.title
        def text = params.text
        def date = params.date
        //if statement checking if we want to get the house members by email or subId
        def byEmail = params.byEmail

        println("post received")
        println( "this is wat i got " + params )

        Person sender = ( Person.findBySubId(senderId) )

        List<String> receiversId = params.receivers.split(",")//list of subIds related it to
        println("list:                 " + receiversId + "\n")

        //checks to see if the post is already in the database
        if(Post.findBySenderNameAndTextAndTitle(sender.firstName, text, title))
        {
            response.status = 402
            respond "same" //this causes an error which exits the method lool
        }

        Post post = new Post(senderName: sender.getFirstName(),
                title: title, text: text, date: date)

        post.save(failOnError : true)

        //add the post also to the sender
        sender.addToPosts(post).save(flush : true)


        for(int i = 0; i<receiversId.size(); i++)
        {
            Person person
            //find the persons by email, hence we are coming from the Calendar posts
            println("\nThis is byEmail ===  "  + byEmail)
            if(byEmail == "true"){
                person = Person.findByEmail(receiversId[i])
                if(person == sender){
                    continue
                }
            }
            else{
                person = Person.findBySubId(receiversId[i])
            }
            if(person != null){
                println("posts     " + post.getText())
                println("person    " + person.getFirstName())

                person.addToPosts(post)
                person.save(flush : true, failOnError : true)
                println("THESE are the add posts       " + person.getPosts())
            }
            else {
                println(receiversId[i]+"   person is nulll\n\n")
            }
        }

        response.status = 200

    }

}
