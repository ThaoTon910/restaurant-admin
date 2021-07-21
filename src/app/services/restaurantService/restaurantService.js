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

}

const instance = new RestaurantService();

export default instance;
