import React, { Component } from 'react'
export class Login extends Component {

    // checks the username is valid. If so, passes back up to App.js so the chat can be rendered
    handleSubmit = (event) => {
        const input = document.getElementById('usernameInput');
        event.preventDefault();

        // user is required to supply a username
        if (input.value === "") {
            alert("Username cannot be blank.");
        }
        else if (input.value.length > 32) {
            alert("Username must be less than 32 characters.");
            input.value = '';
        }
        // there is a valid username
        else {
            //remove any whitespace and standardize the characters in the string
            let name = input.value.trim().normalize();
            //capitalize the start of any words
            name = name.replace(/\b\w/g, c => c.toUpperCase());
            this.props.enterChat(name);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className='input-group'>
                                <input id="usernameInput" type='text'
                                    className="form-control"
                                    placeholder="Enter your username"
                                    aria-label="Username" />
                                <div className='input-group-append'>
                                    <button type="submit" className="btn btn-primary">Log In</button>
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
