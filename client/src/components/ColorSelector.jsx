import React from 'react'

// lets the user change the color of their username. Defaults to black
export default function ColorSelector(props) {
    const displayStyle = {
        fontSize: '14px', paddingTop: '7px', backgroundColor: props.currentColor, height: '25px', width: '25px',
        borderRadius: '50%', marginRight: 'px', display: 'inline-block', position: 'fixed'
    };

    return (
        <React.Fragment>
            <div className='float-right'>User Color:&nbsp;
                <label className='float-right' style={displayStyle}>
                    <input type="color" className='float-right' onChange={props.changeColor} value={props.userColor} style={{ visibility: 'hidden' }} />
                </label>&nbsp;&nbsp;&nbsp;
            </div>
        </React.Fragment>
    )
}
