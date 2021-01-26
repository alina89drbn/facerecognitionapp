import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
 apiKey: '39e981d552f64391a5d35ee5a44903b4'
});

const particlesOptions = {
  particles: {
     number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
     }
           }
 }              

class App extends Component {
  constructor () {
    super();
    this.state = {
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }


    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
        app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
       .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
         }
        );
    }
    onRouteChange = (route) => {
      if (route === 'singout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
       this.setState({isSignedIn: true})
      }
      this.setState({route: 'route'});
    }

  render() {
    return (
      <div className="App">
          <Particles className='particles'
           params={particlesOptions}
          />          
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/> 
            { this.state.route === 'home'
              ? <div>
                  <Logo/>
                  <Rank/>
                  <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSUbmit={this.onButtonSubmit}
                  />
                  <FaceRecognition box={this.state.box}
                    imageUrl={this.state.imageUrl} />
                  }
                </div>
              : (
                this.state.route === 'signin'
                ? <Signin onRouteChange={this.onRouteChange}/>
                : <Register onRouteChange={this.onRouteChange}/>
                )
                
          }
       </div>
    );
  }
}

export default App;
