/**
 * Created by om on 22/02/17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Leaderboard } from './Leaderboard';
import { Header } from './Header';


console.log("index rendering");
ReactDOM.render(

    <div>
        <Header/>
        <div className="row">
          <div className="col-3" frameBorder={true} >
            <Leaderboard/>
         </div>
    </div>
    </div>, document.getElementById('root'));