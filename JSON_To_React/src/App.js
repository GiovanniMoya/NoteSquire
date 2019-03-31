import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

function Image(props) {
  console.log(props.images);
  var images = [];
  var aspectRatio = props.pageSize.height/props.pageSize.width;
  var docImgRatio = [];
  const imgs = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  props.images.images.map(image => (
    images.push({ ///Users/jaminapps/Documents/Programming/react/testparse/src
      index:image.index,
      coordinates: {
        left_top: {
          y:image.left_top_v.y/props.pageSize.height,
          x:image.left_top_v.x/props.pageSize.width
        },
        right_bot: {
          y:image.right_bot_v.y/props.pageSize.height,
          x:image.right_bot_v.x/props.pageSize.width
        }
      },
      imageRatio: (image.right_bot_v.x - image.left_top_v.x)/props.pageSize.width
    })
  ));

  return (
    images.map(image => (
      console.log(image),
      <img src={imgs[`img${image.index}.jpg`]} alt="image not loaded" style={{
        position:'absolute',
        left:image.coordinates.left_top.x*100+'%',
        top:image.coordinates.left_top.y*100+'%',
        width: image.imageRatio*100+'%'
      }} />
    ))
  );
}

function Page(props) {
  var page = {
    blocks: [],
    dimensions: {
      width:props.data.size.width,
      height:props.data.size.height,
      aspectRatio: (props.data.size.height/props.data.size.width)
    }
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
            x: props.data.blocks[i].right_bot_v.x,
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
            x: props.data.blocks[i].paragraphs[j].right_bot_v.x,
            y: props.data.blocks[i].paragraphs[j].right_bot_v.y
          }
        }
      });
    }
  }

  return (

      <div class='page' style={{
        position: 'absolute',
        paddingBottom: (page.dimensions.aspectRatio)*90 + 'vw',
        width: '70vw',
        left:'15vw',
        right:'15vw',
        fontSize:'10vw'
      }}>
      {[
        <Image images={props.images} pageSize={{
          width:props.data.size.width,
          height:props.data.size.height
        }}/>,
        page.blocks.map(block => (
          console.log((block.coordinates.right_bot.x - block.coordinates.left_top.x) * 100),
          block.paragraphs.map(paragraph => (
                  <p style={{
                    position:'absolute',
                    fontSize: '17%',
                    left:(paragraph.coordinates.left_top.x * 100)+'%',
                    top:(paragraph.coordinates.left_top.y * 100)+'%',
                    height:(paragraph.coordinates.right_bot.y - paragraph.coordinates.left_top.y) * 100 + '%',
                    width:'70%'
                  }}>
                  {paragraph.element}
                  </p>
          ))

      ))

    ]}
    </div>

  );
}

function loadTextData (path) {
  try {
    var data = require('/Users/jaminapps/Documents/Programming/react/json-to-webpage/src/text_data.json');
    console.log(data);
    return require('/Users/jaminapps/Documents/Programming/react/testparse/src/out.json');
  }
  catch(err) {
    console.log('error');
  }
}

function loadPictureData (path) {
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items:{},
      isLoaded:false
    }
  }

  componentDidMount() {

    try {
      var textData = require('/Users/jaminapps/Documents/Programming/react/testparse/src/text_data.json');
      var imageData = require('/Users/jaminapps/Documents/Programming/react/testparse/src/image_data.json');
      this.setState({
        textItem: textData,
        imageData: imageData,
        isLoaded:true,
      });
    }
    catch(err) {
      console.log('error');
    }

  }

  render() {


    var { isLoaded, textItem, imageData } = this.state;
    if (!isLoaded) {
      console.log(imageData);
      return (
        <div>Loading...</div>

      );
    }
    else {
          return (

            <body style={{
              paddingTop: '5%',
              paddingBottom: "115%",
              minWidth: '240px',
              minHeight: '120px',
              width: '100vw'
            }}>
              <Page data={textItem} images={imageData} />
            </body>
          );
    }


  }

}
export default App;
