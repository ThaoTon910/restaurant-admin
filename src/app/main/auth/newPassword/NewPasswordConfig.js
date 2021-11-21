import { authRoles } from 'app/auth';
import NewPassword from './NewPassword';

const NewPasswordConfig = {
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
			path: '/auth/new-password',
			component: NewPassword
		}
	]
};

export default NewPasswordConfig;
