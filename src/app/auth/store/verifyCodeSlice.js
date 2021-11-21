import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cognitoService from 'app/services/cognitoService';
import history from '@history';
import { showMessage } from '../../store/fuse/messageSlice';

export const submitVerifyCode = createAsyncThunk(
	'auth/verifyCode/submitVerifyCode',
	async ({ username, code }, { dispatch, getState }) => {
		await cognitoService
			.verifyCode({
				username,
				code
			})
			.then(data => {
				dispatch(showMessage({ message: `Your passcode is confirmed`, variant: 'success' }));
				history.push('/auth/login');
			})
			.catch(errors => {
				return dispatch(verifyCodeError(errors));
			});
	}
);

const initialState = {
	loading: false,
	errors: [],
	userInfo: null
};

const verifyCodeSlice = createSlice({
	name: 'auth/verifyCode',
	initialState,
	reducers: {
		setVerfifyUser: (state, action) => {
			state.userInfo = action.payload;
		},
		verifyCodeSuccess: (state, action) => {
			state.user = null;
			state.errors = [];
		},
		verifyCodeError: (state, action) => {
			state.errors = action.payload;
		}
	},
	extraReducers: {
		[submitVerifyCode.pending]: (state, action) => {
			state.loading = true;
		}
	}
});

export const { setVerfifyUser, verifyCodeSuccess, verifyCodeError } = verifyCodeSlice.actions;

export default verifyCodeSlice.reducer;
