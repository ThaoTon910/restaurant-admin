import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cognitoService from 'app/services/cognitoService';
import history from '@history';
import { setUserData } from './userSlice';
import { setVerfifyUser } from './verifyCodeSlice';

export const submitRegister = createAsyncThunk(
	'auth/register/submitRegister',
	async ({ username, password, email }, { dispatch, getState }) => {
		return cognitoService
			.createUser({
				username,
				password,
				email
			})
			.then(({ user, userConfirmed, userSub }) => {
				if (!userConfirmed) {
					dispatch(setVerfifyUser({ user, userSub, userConfirmed }));
					history.push('/auth/verify-code');
				} else {
					dispatch(setUserData(user));
					dispatch(registerSuccess());
				}
			})
			.catch(errors => {
				console.log('test errors ', errors);
				return dispatch(registerError(errors));
			});
	}
);

const initialState = {
	loading: false,
	errors: null
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.errors = [];
			state.loading = false;
		},
		registerError: (state, action) => {
			state.errors = action.payload;
			state.loading = false;
		},
		registerReset: (state, action) => {
			state.errors = null;
			state.loading = false;
		}
	},
	extraReducers: {
		[submitRegister.pending]: (state, action) => {
			state.loading = true;
		},
		[submitRegister.fulfilled]: (state, action) => {
			state.loading = false;
		}
	}
});

export const { registerSuccess, registerError, registerReset } = registerSlice.actions;

export default registerSlice.reducer;
