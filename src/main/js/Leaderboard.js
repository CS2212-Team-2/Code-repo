/**
 * Created by om on 23/02/17.
 */

import React from 'react';
import {MembersList} from './MembersList'

var LeaderboardComponent = React.createClass({

    render(){
        console.log("rendering leaderboard\n");
        return (
            <div>
                {<MembersList params={this.props.params}/>}
            </div>
        )
    }
});

export class Leaderboard extends React.Component{
    render(){
        return(<LeaderboardComponent params={this.props.params}/>);
    }
}