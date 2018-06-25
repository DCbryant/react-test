import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { login, letRedirect } from '../../store/actions';
import './index.css';

@connect(
    state => state.user,
    {login,letRedirect}
)
class Login extends React.Component{
    state = {
        user:'',
        pwd:'',
        errorMsg:'',
        showServerError:false
    }


    handleChange = (key,val) => {
        this.setState({
            [key]: val
        });
    }

    showError = (msg) => {
        //处理正则错误
        this.setState({
            errorMsg: msg
        })
        setTimeout(() => {
            this.setState({
                errorMsg: ''
            })
        }, 2000);
    }

    handleLogin = () => {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if(!reg.test(this.state.user)){
            this.showError('用户名格式错误');
        }
        const {user,pwd} = this.state
        this.props.login({user,pwd});
    }

    handleClickRegister = () => {
        this.props.letRedirect()
        this.props.history.push('/register')
    }

    handleClickForgetPass = () => {
        this.props.letRedirect()
        this.props.history.push('/resetPass')
    }

    componentWillReceiveProps(nextProps){
        //处理后端返回错误
        this.setState({
            showServerError:true
        })
        setTimeout(() => {
            this.setState({
                showServerError:false
            })
        }, 2000);
    }

    render() {

        return (
            <div className="mask">
                <div className="wrapper">
                    {this.props.isAuth && this.props.isLogin ? <Redirect to='/home' /> : null}
                    <div className="errorTip">{this.state.errorMsg}</div>
                    <div>
                        <input 
                            type="text"
                            onChange={e => {
                                this.handleChange('user',e.target.value)
                            }} 
                            placeholder="用户名"
                        />
                    </div>
                    <div>
                        <input 
                            type="password"
                            onChange={e => this.handleChange('pwd',e.target.value)} 
                            placeholder="密码"
                        />
                    </div>
                    <input 
                        type="button" 
                        value="登陆" 
                        onClick={
                            this.handleLogin
                        }
                    />
                    <div className="text">
                        <div onClick={this.handleClickForgetPass}>忘记密码</div>
                        <div onClick={this.handleClickRegister}>去注册</div>
                    </div>
                    <div className="serverError">{this.state.showServerError ? this.props.msg : ''}</div>
                </div>
            </div>
        )
    }
}

export default Login