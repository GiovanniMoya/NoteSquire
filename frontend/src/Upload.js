import React, { Component } from 'react';
import logo from './logo.svg';
//import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import './App.css';
//import { createStackNavigator, createAppContainer } from 'react-navigation';


class Upload extends Component {

  constructor(props){
    super(props);
    this.state = {
      file: null,
      moveToResults : false
    }
  }
  uploadFile = event => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.files[0]);
    this.setState(()=>({
      moveToResults:true
    }))
  }
//image-location
////<button>ENTER</button>

//<Link to="/C/Users/Ashkan/LAHacks/NoteSquire/JSON_To_React/App" className="btn btn-primary">hello</Link>
  render() {
    if(this.state.moveToResults === true)
    {
      return <Redirect to ='/Results'/>
    }
    return (
      <div className="App">
          <form method='post' action='http://localhost:5000/' enctype="multipart/form-data">
	            <input text="Upload" type="file" onChange={this.uploadFile} name="imageLocation"/>
              <button>ENTER</button>
	      </form>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Upload;
