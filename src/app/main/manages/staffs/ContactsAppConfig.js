import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	// auth: authRoles.admin,
	routes: [
		{
			path: '/manage/staffs',
			component: lazy(() => import('./ContactsApp'))
		},
		{
			path: '/manage/staffs/:id',
			component: lazy(() => import('./ContactsApp'))
		}
	]
};

export default ContactsAppConfig;
