/**
 * Created by om on 10/03/17.
 */
alert('Whats up!');
import React from 'react';
import ReactDOM from 'react-dom';
import { PostFeed } from './PostFeed'


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