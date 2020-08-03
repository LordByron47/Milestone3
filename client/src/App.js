import React, { Component } from 'react';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entered: false,
      username: ""
    };
  }

  setUsername = (newUsername) =>{
    alert("setUsername");
    alert(JSON.stringify(this.state));
    //this.setState({})
  }

  render() {
    let ret = (this.props.entered) ? <Chat username={this.state.username} /> : <Login enterChat={this.setUsername}/>;
    //let ret = <Login />
    //let ret = this.props.entered ? "true" : "false";


    return (
      <div id="app" class="container" style={{ paddingTop: "100px" }}>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h1>Testing</h1>
                {ret}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default App;