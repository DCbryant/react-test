
import { REGISTER_SUCCESS, LOGIN_SUCESS, ERROR_MSG, LOAD_List_DATA, LOG_OUT, RESET_PASS, LET_REDIRECT } from '../types';

const initState={
	isAuth:false,
	msg:'',
    user:'',
	registerList: [],
	redirectTo:'',
	isLogin:false
}

// reducer
export default function user( state=initState, action){
	switch(action.type){
		case REGISTER_SUCCESS:
			return { ...state, msg:'', isAuth:true, ...action.payload };
		case LOGIN_SUCESS:
			return { ...state, msg:'', isAuth:true, isLogin:true, ...action.payload };
		case LOAD_List_DATA:
			return {...state, msg:'',isAuth:true,registerList: action.payload};
		case ERROR_MSG:
			return { ...state, isAuth:false, msg:action.payload };
		case LOG_OUT:
			return {...state, isAuth:false, isLogin:false };
		case RESET_PASS:
			return {...state, isAuth:true};
		case LET_REDIRECT:
			return {...state,isAuth:false};
		default:
			return state ;
	}
} 
