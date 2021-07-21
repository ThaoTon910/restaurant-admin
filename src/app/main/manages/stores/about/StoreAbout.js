import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectStoresById } from '../store/storesSlice';

function StoreAbout({ location, history, match }) {
	// console.log('StoreAbout location ', location)
	// console.log('StoreAbout history ', history)
	// console.log('StoreAbout match ', match)
	const { storeId } = match.params;
	const isStoreLoading = useSelector(({ nailsApp }) => nailsApp.stores.loading);
	const selectedStore = useSelector(state => selectStoresById(state, storeId));
	// console.log('selectedStore = ', selectedStore);
	useEffect(() => {}, [storeId]);

	return selectedStore ? (
		<>
			<Typography variant="h4" className="mb-24">
				{selectedStore.name}
			</Typography>
		</>
	) : null;
}

export default withRouter(StoreAbout);
