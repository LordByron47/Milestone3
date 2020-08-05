import React, { Component } from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import Login from './components/Login';


class App extends Component {

  state = {
    username: "",
    entered: false
  }

  sendAlerts() {
    let target = document.getElementById("chatDiv");
    /*
    if (target != null) {
      alert(target.scrollTop);
      alert(target.scrollHeight);
      alert(target.offsetHeight);
      alert(target.scrollHeight-target.scrollTop === target.offsetHeight);
    }
    */
  }

  setUsername = (newUsername) => {
    this.setState({
      username: newUsername,
      entered: true
    })
  }

  render() {
    // conditionally render either the Login field or the Chat window
    let ret = (this.state.entered === true) ? <Chatbox username={this.state.username} /> : <Login enterChat={this.setUsername} />;

    return (
      <React.Fragment>
      <div id="app" class="container" style={{ paddingTop: "100px" }}>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                {ret}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={this.sendAlerts} >Position</button>
      </React.Fragment>
    );

  }
}

export default App;