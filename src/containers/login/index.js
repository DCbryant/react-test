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
        errorMsg:''
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
        // 优先处理401错误
        console.log('401')
        if(!!this.props.msg){
            this.setState({
                errorMsg: this.props.msg
            })
        }else{
            this.setState({
                errorMsg: msg
            })
        }
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

    render() {
        console.log(this.props)
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
                </div>
            </div>
        )
    }
}

export default Login