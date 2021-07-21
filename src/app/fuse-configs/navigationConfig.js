import i18next from 'i18next';
import en from './navigation-i18n/en';
import StoreNavigation from '../main/manages/stores/StoreNavigation';
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
				id: 'staffs',
				title: 'Staffs',
				translate: 'STAFFS',
				type: 'item',
				icon: 'account_box',
				url: '/manage/staffs'
			}
		]
	},
	ManageNavigation
];

export default navigationConfig;
