import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

function callPythonCode(path) {
  $.ajax({
    type: "POST",
    url: path
  }).done(function( o ) {
     console.log(o);
     console.log("herro");
  });
}

function generateHTMLTags(item) {
    var dict = {
      titles: [],
      paragraphs: []
    };
    var itemCount = 0;
    var subCount = 0;

    item.titles.map( title => {
      var name = "head" + itemCount.toString() + "-" + subCount.toString();
      var left = title.coordinate.x[0] + 'px';
      var top = title.coordinate.y[0] + 'px';

      const tStyle = {
        left: left,
        top: top,
        position: 'absolute'
      }

      dict.titles.push(<h1 id="{{name}}" style={tStyle}>{title.element}</h1>);
      subCount++;;
    });

    subCount = 0;
    item.paragraphs.map(paragraph => {
      var name = "paragraph" + itemCount.toString() + "-" + subCount.toString();
      var left = paragraph.coordinate.x[0] + 'px';
      var top = paragraph.coordinate.y[0] + 'px';

      const pStyle = {
        left: left,
        top: top,
        position: 'absolute'
      }

      dict.paragraphs.push(<p id="{{name}}" style={pStyle}>{paragraph.element}</p>);
      subCount++;


    });

    return dict;
  }

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isLoaded:false,
    }
  }

  componentDidMount() {

    try {
      var data = require('/Users/jaminapps/Documents/Programming/react/reactapi/src/tdata.json')
      this.setState({
        item: data,
        isLoaded:true,
      });
    }
    catch(err) {
      console.log('error');
    }
  }

  render() {

      var { isLoaded, item } = this.state;

      console.log(this.state.item)

      var path = "/Users/jaminapps/Documents/Projects/NoteSquireFiles/jsonWrite.py ";
      callPythonCode(path);

      const bStyle  = {
        position:'static'
      }

      const dStyle = {

      }

      if (!isLoaded) {
          return <div>Loading...</div>;
      }
      else {
        var htmlTags = generateHTMLTags(item);
        return (
          <body id="body" sytle={bStyle}>
            <div>
              {htmlTags.titles}
              {htmlTags.paragraphs}
            </div>
          </body>
        );
      }


  }
}

export default App;
