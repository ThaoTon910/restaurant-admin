const ManageNavigation = {
	id: 'manage-store',
	title: 'Manage Store',
	type: 'group',
	icon: 'star',
	children: [
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