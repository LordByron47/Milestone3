import React, { Component } from 'react';
import './App.css';
//import Chat from './components/Chat';
import Login from './components/Login';


class App extends Component {

  render() {
    //let ret = (entered) ? <Chat /> : <Login />;
    let ret = <Login />

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