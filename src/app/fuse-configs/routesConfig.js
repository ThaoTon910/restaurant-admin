import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import manageConfigs from 'app/main/manages/manageConfigs';
import pageConfigs from 'app/main/pages/pageConfigs';
import authConfigs from 'app/main/auth/authConfigs';

const routeConfigs = [...manageConfigs, ...pageConfigs, ...authConfigs];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/pages/coming-soon" />
	}
];

export default routes;
