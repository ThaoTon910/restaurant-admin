const ManageNavigation = {
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
		},
		{
			id: 'categories',
			title: 'Category',
			type: 'item',
			icon: 'info',
			url: '/manage/categories',
			exact: false
		}
	]
};

export default ManageNavigation;
