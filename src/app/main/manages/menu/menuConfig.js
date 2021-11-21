import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const MenuConfig = {
	routes: [
		{
			path: '/manage/about',
			component: lazy(() => import('app/main/manages/menu/about/AboutPageLayout'))
		},
		{
			path: '/manage/categories',
			component: lazy(() => import('./CategoryPageLayout')),
			routes: [

			]
		},
		{
			path: '/manage/addons',
			component: lazy(() => import('app/main/manages/menu/addons/AddonPageLayout'))
		},
		{
			path: '/manage/orders/:orderId',
			component: lazy(() => import('app/main/manages/menu/order/Order'))
		},
		{
			path: '/manage/orders',
			component: lazy(() => import('app/main/manages/menu/orders/Orders'))
		},
		{
			path: '/manage', // handle invalid route
			component: () => <Redirect to="/manage/about" />
		}
	]
};

export default MenuConfig;
