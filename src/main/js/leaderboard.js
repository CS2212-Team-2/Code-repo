import React from 'react';

var CLIENT_ID = '731832964818-uecs4clv5qsfubet2rbbr1co235pbost.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar"];

var tempCount = 0;

function checkAuth() {
    gapi.auth.authorize(
      {
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
      }, handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult) {
    loadCalendarApi();
  }
}

function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

function listUpcomingEvents() {
  var count = 0;
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    //'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    //'maxResults': 10,
    'orderBy': 'startTime'
    })

  request.execute(function(resp) {

    var count = 0;
    var check = 0;
    var events = resp.items;

    console.log(events);

    for (var i = 0; i < events.length; i++) { 

      if(events[i].summary === 'RoomMateTask'){

          for (var x = 0; x < events[i].attendees.length; x++) { 
              if(x.responseStatus === "accepted"){
                check = check + 1;
              }

              if(events[i].attendees.length === check){
                count = count + 1;
                break;
              }
          }
      }
    }
  })

  tempCount = count;
}


export default class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      boardList: []
    }
  }

  getParams() {
  
      let url_parameter = {};

      const currLocation = window.location.href,
          parArr = currLocation.split("?")[1].split("%0A++");
      for (let i = 0; i < parArr.length; i++) {
          const parr = parArr[i].split("+%3D+");
          url_parameter[parr[0]] = parr[1];
      }

      let results = [];
      fetch("http://localhost:8080/PersonHouse/getHouseMembers?subId="+url_parameter.subId)
          .then(response => {
              if (response.ok) {
                  //console.log("fetch call received back ok\n");
                  response.json().then(json => {
                      for (let i = 0; i < json.length; i++) {
                        console.log(json[i]);
                        results.push({"username": json[i].firstName+" "+json[i].lastName, "TaskScore": tempCount, "FinanceScore": 0, "Stars": 0, "image": "http://www.kombitz.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"});

                      }
                      this.setState({boardList:results})
                      checkAuth();
                  });
              }
          })

    console.log(results);
  }    

  componentDidMount() {
    this.getParams();
  }

  render() {
    return ( 
      <Leaderboard boardList={this.state.boardList}/>)
  }
}

class Leaderboard extends React.Component {  
  constructor(props) {
    super();
  }
  render() { 

   let results = this.buildRows();

    return (
      <div className="board"> 
        <table  className="table-fill"> 
          <tbody>
            <tr>
              <th>Picture</th>
              <th>Username</th>
              <th>Task Score</th>
              <th>Finance Score</th>
              <th>Stars</th>
            </tr> 
            {results['boardList']}
          </tbody>
        </table> 
    </div>
    )
  }
  
  buildRows() {
    let result = { 
      boardList: []
    };

    result.boardList = this.props.boardList.map((data, index) => {
      return (
        <LeaderboardRow index={index+1} username={data.username} TaskScore={data.TaskScore}
        Stars={data.Stars} Click={data.Click} FinanceScore={data.FinanceScore} image={data.image} key={index}/>
      );
    });

    return result;
  }
}

class LeaderboardRow extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isTooltipActive: false,
      value: ''
    }
  }

  onPress(vis,uName){

    this.setState({
      isTooltipActive: !vis,
      value: uName
    })
  }


  render() {
    return(
      <tr onClick={() => this.onPress(this.state.visible,this.props.username)} >
        <td className="picture"><img  src={this.props.image} height="50" width="50" alt=''/> </td> 
        <td className="uName">{this.props.username}</td>
        <td className="Score">{this.props.TaskScore}</td> 
        <td className="Finance">{this.props.FinanceScore}</td> 
        <td className="Stars">{this.props.Stars}</td> 
      </tr>
    )
  }
}

