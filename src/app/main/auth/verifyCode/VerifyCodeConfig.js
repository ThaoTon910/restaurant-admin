import { authRoles } from 'app/auth';
import VerifyCode from './VerifyCode';

const VerifyCodeConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/auth/verify-code',
			component: VerifyCode
		}
	]
};

export default VerifyCodeConfig;
