import axios from 'axios';
import { REGISTER_SUCCESS, LOGIN_SUCESS, ERROR_MSG, LOAD_List_DATA } from '../types';

function registerSuccess( data ) {
	return { type:REGISTER_SUCCESS, payload:data}
}

function loginSuccess( data ) {
	return { type:LOGIN_SUCESS , payload:data}
}

function errorMsg( msg ) {
	return { msg, type:ERROR_MSG }
}

function loadListDataSuccess( list ) {
	console.log(list)
	return { type:LOAD_List_DATA, payload:list}
}

export function login({ user, pwd }){
	if (!user||!pwd) {
		return errorMsg('用户密码必须输入')
	}
	return dispatch => {
		axios.post('/login',{user,pwd})
			.then( res=> {
				if (res.status === 200 && res.data.code === 0) {
					// dispatch(registerSuccess({user,pwd,type}))
					dispatch(loginSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}
}

export function regisger({ user, nick, pwd }){
	if (!user||!nick||!pwd) {
		return errorMsg('用户名密码必须输入')
	}
	return dispatch => {
		axios.post('/register',{ user, nick, pwd })
			.then( res=> {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(registerSuccess({ user, nick, pwd }))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}
}

export function loadListData() {
	return dispatch => {
		axios.get('/users')
			.then( res => {
				if ( res.status === 200 && res.data.code === 0 ) {
					dispatch( loadListDataSuccess(res.data.data) )
				}else{
					dispatch( errorMsg(res.data.msg) )
				}
			})		
	}
}