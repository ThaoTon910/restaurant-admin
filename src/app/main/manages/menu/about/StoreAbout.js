import { withRouter, Link } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import FuseUtils from '@fuse/utils';
import restaurantService from 'app/services/restaurantService';

// import { selectStoresById } from '../store/storesSlice';
// import { StoreContextDispatch, STORE_ACTION_SET_HEADER_RIGHT } from '../context/StoreContext';

function StoreEditButton({ path }) {
	return (
		<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
			<Button component={Link} to={path} className="whitespace-nowrap" variant="contained" color="secondary">
				<span className="flex">Edit</span>
			</Button>
		</motion.div>
	);
}

function StoreAbout({ location, history, match }) {
	const [selectedStore, setSelectedStore] = useState(null);
	// restaurantService.getMerchant();
	useEffect(() => {
		restaurantService.getMerchant().then(response => {
			// console.log("merchant ", response);
			setSelectedStore(response.data)
		})

	}, [])


	// const storeContextDispatch = useContext(StoreContextDispatch);
	// const { storeId } = match.params;
	// const isStoreLoading = useSelector(({ nailsApp }) => nailsApp.stores.loading);
	// const selectedStore = useSelector(state => selectStoresById(state, storeId));
	// useEffect(() => {
	// 	storeContextDispatch({
	// 		type: STORE_ACTION_SET_HEADER_RIGHT,
	// 		payload: <StoreEditButton path={`/manage/stores/${storeId}/edit`} />
	// 	});
	//
	// 	return () => {
	// 		// Clean up when leaving the page
	// 		storeContextDispatch({ type: STORE_ACTION_SET_HEADER_RIGHT, payload: null });
	// 	};
	// }, [storeContextDispatch, storeId]);

	return selectedStore ? (
		<>
			<TableContainer className="max-w my-16" component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className="font-semibold text-14">Store Information</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>{selectedStore.name}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Phone</TableCell>
							<TableCell>{selectedStore.phone}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Address</TableCell>
							<TableCell>{selectedStore.address}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>

			<TableContainer className="max-w my-16" component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className="font-semibold text-14">Date</TableCell>
							<TableCell className="font-semibold text-14">From</TableCell>
							<TableCell className="font-semibold text-14">To</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{selectedStore.hours && selectedStore.hours.map((hourDay, id) => (
							<TableRow key={id}>
								<TableCell>{hourDay.day}</TableCell>
								<TableCell>{hourDay.off ? '-' : FuseUtils.formatHour(hourDay.start)}</TableCell>
								<TableCell>{hourDay.off ? '-' : FuseUtils.formatHour(hourDay.end)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	) : null;
}

export default withRouter(StoreAbout);
