import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
//import App from '/C/Users/Ashkan/LAHacks/NoteSquire/JSON_To_React/App'
import Upload from './Upload';
import Results from './Results'

//<Route path="/C/Users/Ashkan/LAHacks/NoteSquire/JSON_To_React/App." component={App} /> 
const routing = (
    <Router>
      <div>
        <Route exact path="http://localhost:5000/" component={Upload} />
        <Route path="./Results" component={Results}/>
      </div>
    </Router>
  )

  ReactDOM.render(routing, document.getElementById('Upload'))
