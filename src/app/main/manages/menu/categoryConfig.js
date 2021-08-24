import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const CategoryConfig = {
	routes: [
		{
			path: '/manage/categories',
			component: lazy(() => import('./CategoryPageLayout')),
			routes: [

			]
		},

		{
			path: '/manage/addons',
			component: lazy(() => import('app/main/manages/menu/addons/AddonPageLayout'))
		}
	]
};

export default CategoryConfig;
