import i18next from 'i18next';
import en from './navigation-i18n/en';
import ManageNavigation from '../main/manages/manageNavigation';

i18next.addResourceBundle('en', 'navigation', en);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'comming-soon',
				title: 'Comming Soon',
				translate: 'COMMING SOON',
				type: 'item',
				icon: 'account_box',
				url: '/pages/coming-soon'
			}
		]
	},
];

export default navigationConfig;
