
import { REGISTER_SUCCESS, LOGIN_SUCESS, ERROR_MSG, LOAD_List_DATA } from '../types';

const initState={
	isAuth:false,
	msg:'',
    user:'',
    registerList: [],
}

// reducer
export default function user( state=initState, action){
	switch(action.type){
		case REGISTER_SUCCESS:
			return { ...state, msg:'', isAuth:true, ...action.payload };
		case LOGIN_SUCESS:
			return { ...state, msg:'', isAuth:true, ...action.payload };
		case LOAD_List_DATA:
			return { ...state, isAuth:true, registerList:action.payload };
		case ERROR_MSG:
			return { ...state, isAuth:false, msg:action.msg };
		default:
			return state ;
	}
} 
