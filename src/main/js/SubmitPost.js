
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



    }

    componentDidMount() {
        this.getHouseMatesOp();
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
        this.postPost(this.state.text, this.state.selected);
    }

    postPost(text, selectedPersons){
        var date = (new Date()).toDateString();

        var receiversStr = "";
        for (var i = 0; i<selectedPersons.length; i++){
            receiversStr += selectedPersons[i].value + ",";
        }


        fetch('http://localhost:8080/Post/addPost?subId=' + this.props.subId +
                '&title=' + 'Post' + '&date='+ date +
            '&text=' + text + '&receivers=' + receiversStr ,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
            if (response.ok) {
                console.log("response is ok");
                    this.setState({
                        status: "Post successfully posted!!!",
                        text : "",
                        selected : []

                });
                this.props.update(this.props.subId);
            }
            else {
                this.setState({
                    status: "Post Failed :(",
                });
                console.log("response is not ok");

                // If response is NOT OKAY (e.g. 404), clear the statuses.
            }
        });
    }

    getHouseMatesOp(){
        console.log("fetch call sent...\n");
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
                        this.setState({houseMates:results})
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
        var houseMateNames = [];

        for(var i = 0; i < this.state.houseMates.length; i++){
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
                        <input type="text" onChange={this.handleChange} defaultValue={this.state.text}/>
                    </label>
                    <input type="submit" value="Post"
                           disabled={(this.state.selected.length==0 || this.state.text.trim().length == 0)}/>
                </form>
                <FilteredMultiSelect
                    onChange={this.handleChangeOp}
                    options={houseMateNames}
                />
                <input type="hidden" className="n o-see"/>

                <div>
                    <ul>
                        {listItems}
                    </ul>
                </div>
            </div>
        );
    }
}