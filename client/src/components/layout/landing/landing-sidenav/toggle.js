import React, { Fragment } from "react"
import "./componentStyles.css"

const Toggle = ({ click }) => {
    return (

        <Fragment>
            <button id="toggle" onClick={click}>&#8801;
            </button>
        </Fragment>
    )
}

export default Toggle