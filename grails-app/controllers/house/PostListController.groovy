package house

import grails.rest.RestfulController

class PostListController extends RestfulController {

    PostListController() {
        super(PostList)
    }

    def index() { }

    def getPosts(){
        postList
    }

    def addPost(){

    }

}
