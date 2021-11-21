import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import verifyCode from './verifyCodeSlice';
import user from './userSlice';

const authReducers = combineReducers({
	user,
	login,
	register,
	verifyCode
});

export default authReducers;
