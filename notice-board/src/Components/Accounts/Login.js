import React, { Component } from 'react'
import { TextField, Button, Snackbar } from '@material-ui/core';
import { LoginRequestModel } from '../../Utils/Models';
import HttpService from '../../Utils/HttpService';
import { API_END_POINTS, Utils } from '../../Utils/Utils';


export class Login extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService()
        this.utils = new Utils()
        this.state = {
            loginFailed: false
        }
    }

    componentDidMount() {
        if (this.utils.isLoggedIn()) {
            window.location = '/view-all'
        }
    }

    onLogin = (e) => {
        e.preventDefault();
        var loginData = new LoginRequestModel()
        loginData.userName = e.target.userName.value
        loginData.password = e.target.password.value
        this.http.postData(API_END_POINTS.Login, loginData).then(response => {
            var loginData = response.data.results[0]
            if (loginData == null) {
                this.setState({
                    loginFailed: true
                })
            }
            else {
                this.utils.saveLoginDataInCookies(loginData);
                window.location = '/view-all';
            }
        }).catch(error => {
            this.setState({
                loginFailed: true
            })
        });
    }

    handleLoginSnack = () => {
        this.setState({
            loginFailed: false
        })
    }

    render() {
        return (
            <div className='container-wrapper'>
                <div className='container'>
                    <div className='row'>
                        {
                            !this.state.loginFailed ? null :
                                <Snackbar open={this.state.loginFailed} onClose={this.handleLoginSnack} autoHideDuration={6000} message="Invalid credentials. Please try again." />
                        }
                        <div className='col-md-3'></div>
                        <div className='col-md-6 col-xs-12 page-middle'>
                            <div className='page-middle-content'>
                                <h4 className='center-content logo'>
                                    #NoticeBoard
                                </h4>
                                <br />
                                <form onSubmit={this.onLogin}>
                                    <div className='form-group'>
                                        <TextField className='full-text-field' label="UserName" variant="outlined" name='userName' autoComplete="off" />
                                    </div>
                                    <div className='form-group'>
                                        <TextField type='password' className='full-text-field' name='password' label="Password" variant="outlined" />
                                    </div>
                                    <a href='/'>Forgot Password?</a>
                                    <Button type='submit' className='float-right' variant="contained" color="primary">
                                        Login
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
