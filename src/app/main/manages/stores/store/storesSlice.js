import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

// TODO: Create a environment variable and put it in .env file.
axios.defaults.baseURL = 'https://lqon280nff.execute-api.us-west-2.amazonaws.com/v0';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getStores = createAsyncThunk('nailsApp/stores/getStores', async (routeParams, { dispatch, getState }) => {
	dispatch(setLoading(true));
	const response = await axios.get('/stores');
	const data = await response.data;

	return { data, routeParams };
});

export const updateStore = createAsyncThunk('nailsApp/stores/updateStore', async (store, { dispatch, getState }) => {
	const response = await axios.post(`/store/${store.id}`, { store });
	const data = await response.data;

	dispatch(getStores());

	return data;
});

const storesAdapter = createEntityAdapter({});

export const { selectAll: selectStores, selectById: selectStoresById } = storesAdapter.getSelectors(
	state => state.nailsApp.stores
);

const storesSlice = createSlice({
	name: 'nailsApp/stores',
	initialState: storesAdapter.getInitialState({ loading: false }),
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		}
	},
	extraReducers: {
		[updateStore.fulfilled]: storesAdapter.upsertOne,
		[getStores.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			storesAdapter.setAll(state, data);
			state.loading = false;
		}
	}
});

export const { setLoading } = storesSlice.actions;

export default storesSlice.reducer;
