import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { login,resetPass } from '../../store/actions';

@connect(
    state => state.user,
    {login, resetPass}
)
class ResetPass extends React.Component{
    state = {
        pwd:''
    }

    

    handleChange = (key,val) => {
        this.setState({
            [key]: val
        });
    }

    handleReset = () => {
        const {pwd} = this.state;
        this.props.resetPass(pwd);
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
                            type="password"
                            onChange={e => this.handleChange('pwd',e.target.value)} 
                            placeholder="密码"
                        />
                    </div>
                    <input 
                        type="button" 
                        value="修改" 
                        onClick={
                            this.handleReset
                        }
                    />
                     <a className="textArea" onClick={
                        this.handleClickLogin
                    }>去登陆</a>
                </div>
            </div>
        )
    }
}

export default ResetPass