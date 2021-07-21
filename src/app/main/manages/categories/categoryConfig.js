import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const CategoryConfig = {
	routes: [
		{
			path: '/manage/categories',
			component: lazy(() => import('./Categories')),
			routes: [

			]
		}
	]
};

export default CategoryConfig;
