import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      file: null
    }
  }
  uploadFile = event => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.files[0]);
  }
//image-location
  render() {
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

export default App;
