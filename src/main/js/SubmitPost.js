
import React from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';


export default class SubmitPost extends React.Component{
    constructor() {
        super();

        this.state = {
            text: "",
            houseMates: [],
            selected: [],
        };

        // this.getHouseMatesOp = this.getHouseMatesOp.bind(this);
        this.handleChangeOp = this.handleChangeOp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.listEvents = this.listEvents.bind(this);
    }

    componentDidMount(){
        this.getHouseMatesOp();

        setTimeout( this.listEvents, 2000);

        //hiding the stupid filter box thing
        document.getElementsByClassName('FilteredMultiSelect__filter')[0].style.visibility = 'hidden';
    }

    handleChange(e){
        e.preventDefault();
        this.setState({text : e.target.value});
        console.log("THIS IS THE TEXT IN THE BOX:              " + this.state.text);

    }

    handleSubmit(e){
        e.preventDefault();
        this.postPost("Post",this.state.text, this.state.selected, false, (new Date()).toISOString());
        //title, text, selectedPersons, eventPost, date
    }

    listEvents() {
        console.log("IN list on call");
        console.log("IN while on call");
        let timeMax = new Date();
        timeMax.setHours(23);
        timeMax.setMinutes(59);
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'timeMax': timeMax.toISOString()    ,
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response) => {
            let events = response.result.items;
            let eventTitle;
            let attendees = [];
            let eventText = '';
            let eventTime;
            for(let i = 0; i < events.length; i++) {
                //find the attendees
                for (let j = 0; j < events[i].attendees.length; j++) {
                    attendees.push(events[i].attendees[j].email);
                    console.log(events[i].attendees[j].email);
                }
                eventTitle = events[0].summary;

                eventText = "Your "+ eventTitle +" is " + events[0].description;
                eventTime = events[i].start.dayTime;

                alert(eventTime);

                this.postPost(eventTitle, eventText, attendees, true, eventTime);
                }
        });
    }

    postPost(title, text, selectedPersons, eventPost, date){



        let receiversStr = "";
        for (let i = 0; i < selectedPersons.length; i++){
            receiversStr += selectedPersons[i] + ",";

        }

        console.log(receiversStr);
        fetch('http://localhost:8080/Post/addPost?byEmail=' + eventPost + '&subId=' + this.props.subId +
                '&title=' + title + '&date='+ date +
            '&text=' + text + '&receivers=' + receiversStr ,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                console.log("updating ui");
                this.props.update(this.props.subId);
                if(!eventPost) {
                    if (response.ok) {
                        console.log("response is ok");
                        this.setState({
                            status: "Post successfully posted!!!",
                            text: "",
                            selected: []
                        });
                    }
                    else {
                        this.setState({
                            status: "Post Failed :(",
                        });
                        console.log("response is not ok");

                        // If response is NOT OKAY (e.g. 404), clear the statuses.
                    }
                }

            });


    }

    getHouseMatesOp(){
        console.log("getting house mates call sent...\n");
        //How r we communicating with the backend, what should we send in, (name) id, etc
        let results = [];
        fetch("http://localhost:8080/PersonHouse/getHouseMembers?subId="+this.props.subId)
            .then(response => {
                if (response.ok) {
                    //console.log("fetch call received back ok\n");
                    response.json().then(json => {
                        for (let i = 0; i < json.length; i++) {
                            results.push(json[i]);
                        }
                        this.setState({houseMates:results});
                    });
                }
            })
    }

    handleChangeOp(selected){
        //need to add it not replace it some how
        this.setState({
            selected : this.state.selected.concat(selected)
        });
    }


    render(){
        let houseMateNames = [];

        for(let i = 0; i < this.state.houseMates.length; i++){
            //I made it auto send posts to urself
            if(this.state.houseMates[i].subId != this.props.subId)
                houseMateNames.push(
                    {value: this.state.houseMates[i].subId, text: this.state.houseMates[i].firstName}
                );
        }
        const listItems = this.state.selected.map((select) =>
            <li key={select.value}>
                {select.text}
            </li>
        );
        console.log("REENDERING SUBMIT POST AREA");


        return (
            <div>
                <div>{this.state.status}</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" onChange={this.handleChange}  value={this.state.text}/>
                    </label>
                    <input type="submit" value="Post"
                           disabled={(this.state.selected.length==0 || this.state.text.trim().length == 0)}/>
                </form>
                <FilteredMultiSelect
                    onChange={this.handleChangeOp}
                    options={houseMateNames}
                    selectedOptions={this.state.selected}
                />

                <div>
                    <ul>
                        {listItems}
                    </ul>
                </div>
            </div>
        );
    }
}