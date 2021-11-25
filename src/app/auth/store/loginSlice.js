import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import cognitoService from 'app/services/cognitoService';
import history from '@history/@history';
import { setUser } from 'app/auth/store/userSlice';
import { setUserData } from './userSlice';
import { setVerfifyUser } from './verifyCodeSlice';

// https://haverchuck.github.io/docs/js/authentication
export const submitLogin =
	({ username, password }) =>
	async dispatch => {
		return cognitoService
			.signInWithUserNameAndPassword(username, password)
			.then(user => {
				if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
					// // You need to get the code from the UI inputs
					// // and then trigger the following function with a button click
					// const code = getCodeFromUserInput();
					// // If MFA is enabled, sign-in should be confirmed with the confirmation code
					// const loggedUser = await Auth.confirmSignIn(
					// 	user,   // Return object from Auth.signIn()
					// 	code,   // Confirmation code
					// 	mfaType // MFA Type e.g. SMS, TOTP.
					// );
					return dispatch(loginError({ message: 'SMS_MFA | SOFTWARE_TOKEN_MFA is not supported yet' }));
				}
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
					// You need to get the new password and required attributes from the UI inputs
					// and then trigger the following function with a button click
					// For example, the email and phone_number are required attributes
					dispatch(setUser({ cognito: user }));
					return history.push('/auth/new-password', { username, email: username });
				}
				if (user.challengeName === 'MFA_SETUP') {
					// This happens when the MFA method is TOTP
					// The user needs to setup the TOTP before using it
					// More info please check the Enabling MFA part
					// Auth.setupTOTP(user);

					return dispatch(loginError({ message: 'MFA_SETUP is not supported yet' }));
				}

				// transform cognito format to app format

				dispatch(setUserData(cognitoService.generateAppUserData(user)));
				return dispatch(loginSuccess());
			})
			.catch(errors => {
				if (errors.code === 'UserNotConfirmedException') {
					// The error happens if the user didn't finish the confirmation step when signing up
					// In this case you need to resend the code and confirm the user
					// About how to resend the code and confirm the user, please check the signUp part

					dispatch(setVerfifyUser({ user: { username } }));
					history.push('/auth/verify-code');
					return dispatch(loginReset());
				}
				if (errors.code === 'PasswordResetRequiredException') {
					// The error happens when the password is reset in the Cognito console
					// In this case you need to call forgotPassword to reset the password
					// Please check the Forgot Password part.
					return history.push('/auth/reset-password');
				}
				return dispatch(loginError(errors));
			});
	};

export const submitLoginWithFireBase =
	({ email, password }) =>
	async dispatch => {
		if (!firebaseService.auth) {
			console.warn("Firebase Service didn't initialize, check your configuration");

			return () => false;
		}
		return firebaseService.auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				return dispatch(loginSuccess());
			})
			.catch(error => {
				const emailErrorCodes = [
					'auth/email-already-in-use',
					'auth/invalid-email',
					'auth/operation-not-allowed',
					'auth/user-not-found',
					'auth/user-disabled'
				];
				const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
				const response = [];

				if (emailErrorCodes.includes(error.code)) {
					response.push({
						type: 'email',
						message: error.message
					});
				}

				if (passwordErrorCodes.includes(error.code)) {
					response.push({
						type: 'password',
						message: error.message
					});
				}

				if (error.code === 'auth/invalid-api-key') {
					dispatch(showMessage({ message: error.message }));
				}

				return dispatch(loginError(response));
			});
	};

const initialState = {
	success: false,
	errors: null
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
		},
		loginError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
		},
		loginReset: (state, action) => {
			state.success = false;
			state.errors = null;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError, loginReset } = loginSlice.actions;

export default loginSlice.reducer;
