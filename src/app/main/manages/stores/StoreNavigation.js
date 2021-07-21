const StoreNavigation = {
	id: 'manage-store',
	title: 'Manage Store',
	type: 'group',
	icon: 'star',
	children: [
		{
			id: 'stores-about',
			title: 'About',
			type: 'item',
			icon: 'info',
			url: '/manage/stores/:storeId/about',
			exact: false
		}
	]
};

export default StoreNavigation;
