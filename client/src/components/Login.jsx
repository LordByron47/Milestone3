import React from 'react'

export default function Login() {

    function enterChat() {
        this.entered = !!this.username !== '';
    }

    return (
        <div class="row" v-else>
            <div class="col-md-12">
                <form method="post" onsubmit={(e)=>{e.preventDefault();}}>
                    <div class="form-group">
                        <div class='input-group'>
                            <input type='text'
                                class="form-control"
                                placeholder="Enter your username"
                                aria-label="Username" />
                                <div class='input-group-append'>
                                    <button class='btn btn-primary' onclick="enterChat">Enter</button>
                                </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
