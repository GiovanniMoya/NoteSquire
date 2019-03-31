import React, { Component } from 'react';
import logo from './logo.svg';
import './Results.css';

function Page(props) {

  var page = {
    blocks: [],
    dimensions: {
      width:props.data.size.width,
      height:props.data.size.height,
      aspectRatio: props.data.size.height/props.data.size.width
    },

  };

  for (var i = 0; i < props.data.blocks.length; i++) {
    page.blocks.push({
        paragraphs:[],
        coordinates: {
          left_top: {
            x: props.data.blocks[i].left_top_v.x,
            y: props.data.blocks[i].left_top_v.y
          },
          right_bot: {
            x: props.data.blocks[i].right_bot_v.y,
            y: props.data.blocks[i].right_bot_v.y
          }
        }
    });

    for (var j = 0; j < props.data.blocks[i].paragraphs.length; j++) {
      page.blocks[i].paragraphs.push({
        element:props.data.blocks[i].paragraphs[j].para_str,
        coordinates: {
          left_top: {
            x: props.data.blocks[i].paragraphs[j].left_top_v.x,
            y: props.data.blocks[i].paragraphs[j].left_top_v.y
          },
          right_bot: {
            x: props.data.blocks[i].paragraphs[j].right_bot_v.y,
            y: props.data.blocks[i].paragraphs[j].right_bot_v.y
          }
        }
      });

    }

  }

  return (
    <body>
        <div className='page' style={{
          paddingBottom: page.dimensions.aspectRatio*100 + '%',
          width: '70%',
          float: 'center'
        }}>
        {
          page.blocks.map(block => (
            console.log(page.dimensions.aspectRatio*100),
            <div className='block' style={{
              position:'relative',
              left:block.coordinates.left_top.x * (page.dimensions.aspectRatio*document.maxWidth),
              top:block.coordinates.right_bot.y * (page.dimensions.aspectRatio*document.maxHeight)
            }}>
              {
                block.paragraphs.map(paragraph => (
                  console.log( paragraph.coordinates.left_top.x* (document.maxWidth)),
                  <p style={{
                    fontSize:'200px',
                    position:'relative',
                    color: 'black',
                    left:paragraph.coordinates.left_top.x* (page.dimensions.aspectRatio*document.maxWidth),
                    top:paragraph.coordinates.right_bot.y* (page.dimensions.aspectRatio*document.maxHeight)
                  }}>
                  {paragraph.element}
                  </p>
                ))
              }
            </div>

          ))
        }
        </div>
      </body>
  );

}

function loadData (path) {
  try {
    var data = require('/Users/jaminapps/Documents/Programming/react/json-to-webpage/src/out.json');
    console.log(data);
    return require('/Users/jaminapps/Documents/Programming/react/testparse/src/out.json');
  }
  catch(err) {
    console.log('error');
  }
}

class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items:{},
      isLoaded:false
    }
  }

  componentDidMount() {
    try {
      //C:\Users\Ashkan\LAHacks\NoteSquire\readerModule\temp
      //var data = require('/Users/jaminapps/Documents/Programming/react/testparse/src/out.json');
      var data = require('C:/Users/Ashkan/LAHacks/NoteSquire/readerModule/temp/text_data.json');
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
    console.log(item);

    if (!isLoaded) {
      return (
        <div>Loading...</div>

      )
    }
    else {
          return (
            <Page data={item} />
          );
    }

  }


}

export default Results;
