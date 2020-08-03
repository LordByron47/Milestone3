import React, { Component } from 'react'

export class Login extends Component {

    constructor(props) {
        super(props);
        //this.state = {...props};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        alert(JSON.stringify(this.state));
    }

    handleSubmit(event) {
        event.preventDefault();
        alert("handleSubmit");

        if (this.state.username === "")     // user is required to supply a username
            alert("Username cannot be blank.");
        else {
            alert("valid");
            
            this.setState(prevState => ({
                entered: !prevState.entered
              }));
            
           //this.props.setUsername
        }
        alert(JSON.stringify(this.state));
    }

    handleChange(event) {
        this.setState({ username: event.target.value });
    }

    render() {
        return (
            <div class="row" v-else>
                <div class="col-md-12">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <div class='input-group'>
                                <input id="usernameInput" type='text'
                                    class="form-control"
                                    placeholder="Enter your username"
                                    aria-label="Username" value={this.props.username} onChange={this.handleChange} />
                                <div class='input-group-append'>
                                    <button type="submit" class="btn btn-primary">Enter!</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

export default Login
