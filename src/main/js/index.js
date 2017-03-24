/**
 * Created by om on 10/03/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { PostFeed } from './PostFeed'
import App from './leaderboard'
import Dropzone from 'react-dropzone';


console.log("index rendering");
function  getParams() {
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


var root = document.getElementById('root');
let theParams = getParams();
ReactDOM.render(
    <div>
        <div className="row">
            <div className="col-3" frameBorder={true} >
                {<PostFeed params={theParams}/>}
            </div>
        </div>
    </div>, root);


ReactDOM.render(
  <App />,
  document.getElementById('leaderboard')
);



function encodeAndUpload(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        fetch('http://localhost:8080/house/settings/upload?imageName=' + file.name,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: reader.result
        }).then(res =>{
            if(res.ok){
                alert("success!");
            }
            else{
                alert("fail!")
            }
        });
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

var DropzoneDemo = React.createClass({
    render: function () {
        return (
            <div>
                <Dropzone onDrop={this.onDrop}>
                    <div>Try dropping a file here, or click to select file to upload.</div>
                </Dropzone>
            </div>
        );
    },
    onDrop: function (files) {
        console.log('Received files: ', files);
        encodeAndUpload(files[0])
    }

});

ReactDOM.render(
        <DropzoneDemo />,
    document.getElementById('app-div')
);