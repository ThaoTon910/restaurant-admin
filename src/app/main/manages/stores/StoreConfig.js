import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const StoreConfig = {
	routes: [
		{
			path: '/manage/stores',
			component: lazy(() => import('./StorePageLayout')),
			routes: [
				{
					path: '/manage/stores/:storeId/about',
					component: lazy(() => import('./about/StoreAbout'))
				},

				{
					path: '/manage/stores/:storeId/about2',
					component: lazy(() => import('./about/StoreAbout'))
				},
				{
					path: '/manage/stores', // handle invalid route
					component: () => <Redirect to="/manage/stores" />
				}
			]
		}
	]
};

export default StoreConfig;
