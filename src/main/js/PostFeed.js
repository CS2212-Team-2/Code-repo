/**
 * Created by om on 10/03/17.
 */

import React from 'react';
import  SubmitPost  from './SubmitPost';

var Post = React.createClass({
    getInitialState(){
        return{

        }
    },
    render(){
        return(
            <div id="post">
                <div className="centred">{this.props.title + " " + this.props.date}</div>
                {"From:  "+this.props.sender}<br/>
                {this.props.text}

            </div>
        );
    }

});


export class PostFeed extends React.Component{

    constructor(){
        super();
        this.state = {
            postList : []
        };

        this.fetchPosts = this.fetchPosts.bind(this);
    }

    fetchPosts(subId){
        console.log("getting update to backend");
        fetch('http://localhost:8080/Post/getPosts?subId=' + subId )
            .then(response => {
                if(response.ok){
                    response.json().then(json => {
                        let results = [];
                        for (let i = 0; i < json.length; i++) {
                            results.push(<div><Post sender={json[i].senderName} title={json[i].title}
                                                    date={json[i].date} text={json[i].text}/></div>);
                        }
                        this.setState({postList : results});
                    })
                }
                else {
                    // If response is NOT OKAY (e.g. 404), clear the statuses.
                    this.setState({postList: []});
                }
            });
    }

    componentDidMount() {
        let subId = this.props.params.subId;
        this.fetchPosts(subId);
        //this.listOneEvent();
        //alert(isLoaded);
    }

    componentWillReceiveProps(nextProps){
        let subId = this.props.params.subId;
        this.fetchPosts(subId);
    }

    render() {
        console.log(this.props.params.subId);
        return(
            <div>
                <h2 className="centered">Notifications</h2>
                {this.state.postList}
                {<SubmitPost subId={this.props.params.subId} update={this.fetchPosts}
                             firstName={this.props.params.firstName}/>}

            </div>
        );
    }


}