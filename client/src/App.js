import React, { Component } from 'react';
import './App.css';
import ChatboxSubscription from './components/ChatboxSubscription';
import Login from './components/Login';

class App extends Component {

  state = {
    username: "",
  }

  setUsername = (newUsername) => {
    this.setState({
      username: newUsername,
    })
  }

  render() {
    // conditionally render either the Login field or the Chat window
    let ret = (this.state.username !== '') ? <ChatboxSubscription username={this.state.username} /> : <Login enterChat={this.setUsername} />;

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