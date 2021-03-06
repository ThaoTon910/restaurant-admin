import axios from 'axios';
import AUTH_CONFIG from './restaurantServiceConfig';

class RestaurantService {

	getCategories = () => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/category`;

		return axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${this.getAccessToken()}`
			}
		});
		// });
	};

	addCategory = (data) => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/category`;
		return axios.post(url, data);

	};

	updateCategory = (id, data) => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/category/${id}`;
		return axios.put(url, data);
	};

	deleteCategory = (id) => {
		const url = `${AUTH_CONFIG.apiUrl}/category/${id}`;

		return axios.delete(url);
	};

	getMenuItems = () => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/menu-item`;

		return axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${this.getAccessToken()}`
			}
		});
		// });
	};

	addMenuItem = (data) => {
		const url = `${AUTH_CONFIG.apiUrl}/menu-item`;
		const itemData = {
			...data,
			active: true,
			isTaxable: true,
			taxRate: 0
		}
		return axios.post(url, itemData);

	};

	updateMenuItem = async (id, data) => {
		const url = `${AUTH_CONFIG.apiUrl}/menu-item/${id}`;
		const postData = {
			...data,
			active: true
		}
		return axios.put(url, postData)
	};

	deleteMenuItem = async (id) => {
		const url = `${AUTH_CONFIG.apiUrl}/menu-item/${id}`;
		return axios.delete(url);
	};

	getAddonGroups = () => {
		const url = `${AUTH_CONFIG.apiUrl}/addon-group`;

		return axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	addAddonGroup = (data) => {
		const url = `${AUTH_CONFIG.apiUrl}/addon-group`;

		return axios.post(url, data);
	};

	updateAddonGroup = (id, data) => {
		const url = `${AUTH_CONFIG.apiUrl}/addon-group/${id}`;
		return axios.put(url, data);
	};

	deleteAddonGroup = async (id) => {
		const url = `${AUTH_CONFIG.apiUrl}/addon-group/${id}`;
		return axios.delete(url);
	};

	addAddon = (data) => {
		const url = `${AUTH_CONFIG.apiUrl}/addon`;

		return axios.post(url, data);
	};

	updateAddon = (id, data) => {
		const url = `${AUTH_CONFIG.apiUrl}/addon/${id}`;
		return axios.put(url, data);
	};

	deleteAddon = async (id) => {
		const url = `${AUTH_CONFIG.apiUrl}/addon/${id}`;
		return axios.delete(url);
	};

	getMerchant = () => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/merchant`;

		return axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${this.getAccessToken()}`
			}
		});
		// });
	};

	getMerchantById = (id) => {
		const url = `${AUTH_CONFIG.apiUrl}/merchant/${id}`;
		return axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${this.getAccessToken()}`
			}
		});
	}

	updateMerchant = data => {
		const url = `${AUTH_CONFIG.apiUrl}/merchant`;
		return axios.put(url, data);
	};

	getOrders = () => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/order`;

		return axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${this.getAccessToken()}`
			}
		});
		// });
	};

	updateOrderStatus = (id, data) => {
		const url = `${AUTH_CONFIG.apiUrl}/order/${id}`;
		return axios.put(url, data);
	};

}

const instance = new RestaurantService();

export default instance;
