
import React from 'react'
import ToolTip from 'react-portal-tooltip'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

export class Header extends React.Component{

    //logout
    logout(){
        fetch("http://localhost:8080/PersonHouse/logout")
            .then(res =>{
            if(res.ok){
                //redirect to the signout page
                console.log("works");
                window.location = "http://localhost:8080/PersonHouse/logout"
            }
            else{
                console.log("didn't work");
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
            marginRight: '10%',

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

        return(
            <div style={style} >

                <div style={addPersonStyle}><AddPerson/></div>

                <h1 style={titleStyle}>House Mates</h1>
                <div style={personInfoStyle}><PersonInfo/></div>
                <button onClick={() => this.logout()}>
                    <a href="http://localhost:8080"/>
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
        let subject = "HouseMates Invitation";
        let body = "Hello from HouseMates!  Your friend, is requesting that " +
        " you join HouseMates.  Please visit link http://localhost:8080/house/joinhouse. " +
        "You will be asked to authenticate your gmail account. After authentication, your gmail account infomation" +
        " will be used to to register your account. At that point, all you need to do is enter house number" ;
        let email = this.state.email;
        console.log("ok method called");
        fetch("http://localhost:8080/EmailSender/sendFromDashboard?"
        +"address=" + email +"&subject=" + subject + "&body=" + body, {
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
        let firstName =this.getParams().firstName;
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        let lastName = this.getParams().lastName;
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        let houseName = this.getParams().houseName;
        houseName = houseName.replace(/\+/g, " ");
        this.state = {
            name : firstName + " " + lastName,
            houseName : houseName
        }
    }

    componentDidMount(){
    }



    getParams() {
       // http://localhost:8080/house/myHouse?persons=Session+Content%3A%0A++subId+%3D+102369340031760804603%0A++firstName+%3D+down%0A++lastName+%3D+load%0A++houseName+%3D+jb+hg%0A++houseId+%3D+2%0A++org.grails.FLASH_SCOPE+%3D+org.grails.web.servlet.GrailsFlashScope%401467ea6f%0A++email+%3D+stupidemail9898%40gmail.com%0A
        let url_parameter = {};
        const currLocation = window.location.href,
            parArr = currLocation.split("?")[1].split("%0A++");
        for (let i = 0; i < parArr.length; i++) {
            const parr = parArr[i].split("+%3D+");
            url_parameter[parr[0]] = parr[1];
        }

        return url_parameter;
    }

    render(){
        return(
            <div>Welcome to {this.state.houseName},<br/>
            {this.state.name}
            </div>

        );
    }
}
