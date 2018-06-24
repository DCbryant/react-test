import axios from 'axios';
import { REGISTER_SUCCESS, LOGIN_SUCESS, ERROR_MSG, LOAD_List_DATA, LOG_OUT, RESET_PASS, LET_REDIRECT } from '../types';

axios.defaults.withCredentials = true;

// 浏览器把401的错误拦截了，拿不到401的报错。。。

const basicUrl = 'http://z005.kmtongji.com/api' 

function registerSuccess( data ) {
	return { type:REGISTER_SUCCESS, payload:data}
}

function loginSuccess( data ) {
	return { type:LOGIN_SUCESS, payload:data}
}

function errorMsg( msg ) {
	return { type:ERROR_MSG, payload:msg }
}

function loadListDataSuccess( list ) {
	return { type:LOAD_List_DATA, payload:list}
}

function logoutSuccess( data ) {
	return { type:LOG_OUT, payload:data}
}

function resetPassSuccess( data ) {
	return { type:RESET_PASS, payload:data}
}

function letLoginRedtrect(){
	return { type:LET_REDIRECT}
}

export function login({ user, pwd }){
	if (!user || !pwd) {
		return errorMsg('用户密码必须输入')
	}
	return dispatch => {
		axios.post(`${basicUrl}/login`,{
			username : user,			
			password : pwd,
		})
			.then( res=> {
				console.log(res)
				if (res.status === 200) {
					// dispatch(registerSuccess({user,pwd,type}))
					dispatch(loginSuccess(res.user))
				}else{
					dispatch(errorMsg(res.msg))
				}
				if (res.status === 401) {
					console.log('401')
				}
				
			})	
			.catch(err => {
				const msg = err.response.data.err.message
				if(msg === 'Password or username are incorrect'){
					console.log(1)
					dispatch(errorMsg('用户名或密码不正确'))
				}
			})	
	}
}

export function regisger({ user, nick, pwd }){
	
	if (!user || !nick ||!pwd) {
		return errorMsg('用户名密码必须输入')
	}
	return dispatch => {
		console.log(user,nick,pwd)
		axios.post(`${basicUrl}/register`,{ 
			username : user,
			nick : nick,
			password : pwd, 
		})
			.then( res=> {
				if (res.status === 200 ) {
					// A user with the given username is already registered
					console.log(res.data.message)
					if(res.data.message === 'A user with the given username is already registered'){
						console.log('err66')
						dispatch(errorMsg(res.data.message))
					}else{
						dispatch(registerSuccess(res.data.data))
					}
					
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})	
			.catch(err => {
				console.log(err)
			})	
	}
}

export function loadListData() {
	return dispatch => {
		axios.get(`${basicUrl}/users`)
			.then( res => {
				if ( res.status === 200 ) {
					dispatch(loadListDataSuccess(res.data.slice(0,20)))
				}else{
					dispatch( errorMsg(res.data.msg) )
				}
			})
			.catch(err => {
				console.log(err.response)
			})		
	}
}

export function logout() {
	return dispatch => {
		axios.get(`${basicUrl}/logout`)
			.then( res => {
				if ( res.status === 200 ) {
					dispatch(logoutSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
			.catch(err => {
				console.log(err.response)
			})		
	}
}

export function resetPass(pwd) {
	return dispatch => {
		axios.post(`${basicUrl}/users/setPassword`,{
			password:pwd
		})
			.then( res => {
				if ( res.status === 200 ) {
					dispatch(resetPassSuccess(res.msg))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
			.catch(err => {
				console.log(err.response)
			})		
	}
}


export function letRedirect(){
	return dispatch => {
		dispatch(letLoginRedtrect())	
	}
}