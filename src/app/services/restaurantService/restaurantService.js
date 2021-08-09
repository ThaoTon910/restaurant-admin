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

	addCategory = (category) => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/category`;

		return axios.post(url, {
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${this.getAccessToken()}`
			},
			data: category
		});
		// });
	};

	updateCategory = (id, category) => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/category/${id}`;

		return axios.put(url, {
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${this.getAccessToken()}`
			},
			data: category
		});
		// });
	};

	removeCategory = (id) => {
		// return new Promise((resolve, reject) => {
		const url = `${AUTH_CONFIG.apiUrl}/category/${id}`;

		return axios.delete(url, {
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${this.getAccessToken()}`
			},
		});
		// });
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
		console.log(`POSTING TO BACKEND URL: ${url} , Data: ${JSON.stringify(data)} `)
		return "Yay"
		// axios.put(url, data)
	}

}

const instance = new RestaurantService();

export default instance;
