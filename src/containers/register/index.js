import React from 'react';
import {connect} from 'react-redux';
import { regisger } from '../../store/actions';
import {Redirect} from 'react-router-dom';
import './index.css';

@connect(
    state => state.user,
    {regisger}
)
class Register extends React.Component{
    state = {
        user: '',
        nick: '',
        pwd: '',
        errorMsg: '',
        serverError: ''
    }

    componentDidMount (){
        console.log(this.props)
    }

    handleChange = (key,val) => {
        this.setState({
            [key]: val
        });
    }

    showError = (msg) => {
        this.setState({
            errorMsg: msg
        })

        setTimeout(() => {
            this.setState({
                errorMsg: ''
            })
        }, 2000);
    }

    showServerError = (msg) => {
        this.setState({
            serverError: this.props.msg
        })

        setTimeout(() => {
            this.setState({
                serverError: ''
            })
        }, 2000);
    }


    handleRegister = () => {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if(!reg.test(this.state.user)){
            this.showError('用户名格式错误');
        }
        console.log(this.props.msg)
        if(this.props.msg) {
            this.showServerError(this.props.msg)
        }
        const {user,nick,pwd} = this.state
        this.props.regisger({user,nick,pwd});
    }

    handleClickLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="mask">
                <div className="wrapper">
                    {this.props.isAuth ? <Redirect to='/login' /> : null}
                    <div className="errorTip">{this.state.errorMsg}</div>
                    <div>
                        <input 
                            placeholder="用户名：邮箱"
                            type="text"
                            onChange={e => {
                                this.handleChange('user',e.target.value)
                            }} 
                        />
                    </div>
                    <div>
                        <input 
                            placeholder="昵称"
                            type="text"
                            onChange={e => this.handleChange('nick',e.target.value)} 
                        />
                    </div>
                    <div>
                        <input 
                            placeholder="密码"
                            type="password"
                            onChange={e => this.handleChange('pwd',e.target.value)} 
                        />
                    </div>
                    <input 
                        type="button" 
                        value="注册" 
                        onClick={
                            this.handleRegister
                        }
                    />
                    <a className="textArea" onClick={
                        this.handleClickLogin
                    }>去登陆</a>
                    <div className="serverError">{this.state.serverError}</div>
                </div>
            </div>
        )
    }
}

export default Register