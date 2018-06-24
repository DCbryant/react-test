import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { loadListData, logout } from '../../store/actions';
import './index.css';

@connect(
    state => state.user,
    { loadListData, logout }
)
class Home extends React.Component{
    state = {
        userList: []
    }

    componentDidMount(){
        this.props.loadListData()
    }

    handleClick = () => {
        this.props.logout()
    }

    render() {
        const list = this.props.registerList
        return (
            <div className='lists'>
                 {!this.props.isAuth || !this.props.isLogin ? <Redirect to='/login' /> : null}
                 <div className="title">
                    <h3>已注册用户名单</h3> 
                    <button onClick={this.handleClick}>登出</button>
                 </div>
                <ul>
                   {
                        list && list.map(v => {
                            return <li key={v.updatedAt}>{v.username}</li>
                        })
                   }
                </ul>
            </div>
        )
    }
}




export default Home;