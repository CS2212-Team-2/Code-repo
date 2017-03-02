
import React from 'react'
import ToolTip from 'react-portal-tooltip'

export class Header extends React.Component{

    //logout
    logout(){
        fetch("http://localhost:8080/PersonHouse/logout",
        {
            method: 'POST',
                headers: {
            "Content-Type": "application/json"
        }}).then(res =>{
            if(res.ok){
                //redirect to the signout page
            }
            else{
                //tell him he sucks
            }
        });
    }

    render(){

        const style = {
            width: '100%',
            background : 'yellow',
            display: 'flex',
            maxHeight: '10%',
    };

        const personInfoStyle = {
            float : 'right',
            marginRoght: '10%',

        };
        const titleStyle = {
            float : 'center',
            margin: 'auto',
            fontSize: '10vmin',

        };

        const addPersonStyle = {
            maxHeight : '100%',
            textAlign : 'center',


        };

        // const buttonStyle = {
        //
        // };
        return(
            <div style={style} >

                <div style={addPersonStyle}><AddPerson/></div>

                <h1 style={titleStyle}>House Mates</h1>
                <div style={personInfoStyle}><PersonInfo/></div>
                <button onClick={() => this.logout()}>
                    Logout
                </button>
                {/*logout button*/}

            </div>
        );

    }
}

class AddPerson extends React.Component {

    constructor(){
        super();
        this.state = {
            isTooltipActive: false,
            email : "",
            success : ""
        };
    }

    toggleTooltip() {
        if(this.state.isTooltipActive)
        {
            this.setState({isTooltipActive: false});
            return;
        }
        this.setState({isTooltipActive: true})
    }

    sendEmailToBackend(e){
        e.preventDefault();
        let email = this.state.email;
        console.log("ok method called");
        fetch("http://localhost:8080/apis/receiveEmail?"
        +"email=" + email, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }})
            .then(res =>{
                if(res.ok){
                    this.setState({success: 'Invite Sent!'});
                }
                else{
                    this.setState({success: 'Invite was unable to send'});
                }
        });

    }

    handleChange(e){
        e.preventDefault();
        this.setState({
            email : e.target.value
        });
    }
    render() {
        const buttonStyle = {
            textAlign: 'center',
            overflow: 'hidden',
            display: 'block',
            marginTop: '5%',
        };
        return (
            <div>
                <button style={buttonStyle} id="text" onClick={() => this.toggleTooltip()}>
                    ADD ROOMMATE
                </button>
                <ToolTip active={this.state.isTooltipActive} position="bottom" arrow="center" parent="#text">
                    <div>
                        <p>Enter the roommates email</p>
                        <form onSubmit={(e) => this.sendEmailToBackend(e)}>
                            <label>
                                <input type="text" defaultValue={this.state.email}
                                       onChange={(e) => this.handleChange(e)}/>
                                <input type="submit" value="Send invite"/>
                            </label>
                        </form>
                        <p>{this.state.success}</p>

                    </div>
                </ToolTip>
            </div>
        )
    }
}

class PersonInfo extends React.Component{

    constructor(){
        super();
        this.state = {
            name : "",
            email : ""
        }
    }

    componentDidMount(){
        this.fetchFromApiUserInfo();
    }

    fetchFromApiUserInfo() {
        //How r we communicating with the backend, what should we send in, (name) id, etc
        fetch("http://localhost:8080/apis/getInfo")
            .then(response => {
                if (response.ok) {
                    //console.log("fetch call received back ok\n");
                    response.json().then(json => {
                        console.log(json);
                        let name = json.firstName + " " + json.lastName;
                        let email = json.email;

                        this.setState({
                            name: name,
                            email : email
                        });
                    });
                }
                else {
                    console.log("not received");
                }
            });
    }


    render(){
        return(
            <div>{this.state.name} <br/>
                 {this.state.email}
            </div>

        );
    }
}
