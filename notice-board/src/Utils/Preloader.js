import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core';


export class Preloader extends Component {
    render() {
        return (
            <div className="loadingOverlay" id="apiProgress">
                <CircularProgress id="loading-img"></CircularProgress>
            </div>
        )
    }
}

export default Preloader
