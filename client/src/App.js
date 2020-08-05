import React, { Component } from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import Login from './components/Login';


class App extends Component {

  state = {
    username: "",
    entered: false
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
      <div id="app" class="container" style={{ paddingTop: "50px" }}>
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
      </React.Fragment>
    );
  }
}

export default App;