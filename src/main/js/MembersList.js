/**
 * Created by om on 23/02/17.
 */

import React from 'react'
//
// var member = React.createClass({
//
//     getInitialState () {
//         return {
//         }
//     },
//    render()
//    {
//       return( <div>
//            {this.props.name}
//        </div>);
//    }
// });

export class MembersList extends React.Component{


    constructor(){
        super();
        this.state={
            membersList : []
        };
    }


    fetchMembersList() {
        console.log("fetch call sent...\n");
        console.log("props \t" + this.props.params.houseId);
        //How r we communicating with the backend, what should we send in, (name) id, etc
        let results = [];
        fetch("http://localhost:8080/PersonHouse/getHouseMembers?houseId="+this.props.params.houseId)
            .then(response => {
                if (response.ok) {
                    //console.log("fetch call received back ok\n");
                    response.json().then(json => {
                        for (let i = 0; i < json.length; i++) {
                            results.push(json[i]);
                            //console.log(json[i] + " " + i);
                        }
                        console.log(results);
                        this.setState({
                            membersList: results
                        });
                        console.log(this.state.membersList);
                    });
                }
                else {
                    console.log("not received");
                }
            });
    }


    componentDidMount(){
        this.fetchMembersList();
    }
    render(){
        const members = this.state.membersList;
        const membersList = members.map(person =>
            <li key={name.toString()}>
                {"Name: " + person.firstName + " " + person.lastName + "\n"
                + "Email: " + person.email}
            </li>
        );
        return(
            <div>
                <h3>Home Leaderboard</h3>
                <ul className="a">
                    {membersList}
                </ul>
            </div>
        );
    }
}