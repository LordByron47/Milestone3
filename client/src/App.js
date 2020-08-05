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
      <div id="app" className="container" style={{ paddingTop: "50px" }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
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