import React, { Component } from 'react'

export class Login extends Component {
    
    constructor(props){
        super(props);
        this.state={
            user:""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // user is required to supply a username
        if (this.state.user === "") {    
            alert("Username cannot be blank.");
        }
        // there is a valid username
        else {
            //remove
            let name = this.state.user.trim();
            name = name.replace(/\b\w/g, c => c.toUpperCase());
            this.props.enterChat(name);
        }
    }

    handleChange = (event) => {
        this.setState({
            user:event.target.value
          });
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
                                    aria-label="Username" value={this.state.user} onChange={this.handleChange} />
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
