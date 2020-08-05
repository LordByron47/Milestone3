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
            //remove any whitespace and standardize the characters in the string
            let name = this.state.user.trim().normalize();
            //capitalize the start of any words
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
            <div className="row">
                <div className="col-md-12">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className='input-group'>
                                <input id="usernameInput" type='text'
                                    className="form-control"
                                    placeholder="Enter your username"
                                    aria-label="Username" value={this.state.user} onChange={this.handleChange} />
                                <div className='input-group-append'>
                                    <button type="submit" className="btn btn-primary">Enter!</button>
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
