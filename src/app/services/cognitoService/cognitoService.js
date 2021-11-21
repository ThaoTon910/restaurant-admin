import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';

import { Auth } from 'aws-amplify';

class CognitoService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	async handleAuthentication() {
		// const access_token = await this.getAccessToken();
		// console.log("access_token ", access_token)
		//
		//
		// return new Promise(function(resolve, reject) {
		return this.getCurrentAuthenticatedUser().then(user => {
			const cognitoToken = user.getSignInUserSession().getAccessToken();
			if (!cognitoToken) {
				this.emit('onNoAccessToken');

				return;
			}

			if (this.isAuthTokenValid(cognitoToken.getExpiration())) {
				this.setSession(cognitoToken.getJwtToken());
				this.emit('onAutoLogin', true);
			} else {
				this.setSession(null);
				this.emit('onAutoLogout', 'access_token expired');
			}
			// resolve(user.getSignInUserSession().getAccessToken());
		});
		// }.bind(this))
	}

	createUser = model => {
		return Auth.signUp({
			username: model.username,
			password: model.password,
			attributes: {
				email: model.email,
				'custom:settings': '{}'
			}
		});
	};

	verifyCode = model => {
		return Auth.confirmSignUp(model.username, model.code, {
			// Optional. Force user confirmation irrespective of existing alias. By default set to True.
			forceAliasCreation: true
		});
	};

	resendCode = username => {
		return Auth.resendSignUp(username);
	};

	getCurrentAuthenticatedUser = (bypassCache = false) => {
		return Auth.currentAuthenticatedUser({
			bypassCache // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
		});
	};

	signInWithUserNameAndPassword = (username, password) => Auth.signIn(username, password);

	forgotPassword = model => Auth.forgotPassword(model.username);

	forgotPasswordSubmit = ({ username, code, password }) => Auth.forgotPasswordSubmit(username, code, password);

	completeNewPassword = model =>
		Auth.completeNewPassword(
			model.user, // the Cognito User Object
			model.password, // the new password
			// OPTIONAL, the required attributes
			{
				email: model.email
			}
		);

	// By setting global = true, you are revoking all the auth tokens(id token, access token and refresh token)
	// which means the user is signed out from all the devices
	// Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)
	logout = (global = false) => {
		this.setSession(null);
		return (
			Auth.signOut({ global })
				// .then(data => console.log(data))
				.catch(err => console.log(err))
		);
	};

	generateAppUserData = user => {
		const accessToken = user.getSignInUserSession().getAccessToken();
		return {
			from: 'cognito',
			cognito: user,
			roles: ['admin'],
			groups: accessToken.payload['cognito:groups'] || [],
			data: {
				displayName: user.attributes.email,
				email: user.attributes.email,
				shortcuts: [],
				photoURL: 'assets/images/avatars/Velazquez.jpg'
			}
		};
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = accessToken => {
		if (accessToken) {
			localStorage.setItem('jwt_access_token', accessToken);
			axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	isAuthTokenValid = exp => {
		if (!exp) {
			return false;
		}
		const currentTime = Date.now() / 1000;
		if (exp.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};
}

const instance = new CognitoService();

export default instance;
