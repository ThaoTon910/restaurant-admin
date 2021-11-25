import CircularProgress from '@material-ui/core/CircularProgress';

import { useRef, useEffect } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { renderRoutes } from 'react-router-config';

import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';

import { selectStores, getStores } from './store/storesSlice';

import StoreHeader from './StoreHeader';
import withReducer from '../../../store/withReducer';
import { StoreContextProdiver } from './context/StoreContext';
import StorePageHeader from './StorePageHeader';

function StorePageLayout({ content, route }) {
	const pageLayout = useRef(null);
	const dispatch = useDispatch();

	const nailStores = useSelector(selectStores);
	const isStoreLoading = useSelector(({ nailsApp }) => nailsApp.stores.loading);
	const storeNavigation = useSelector(({ nailsApp }) => nailsApp.stores.storeNavigation);
	useEffect(() => {
		dispatch(getStores());
	}, [dispatch]);
	return (
		<StoreContextProdiver>
			<FusePageCarded
				header={
					<div className="flex items-center justify-center px-4 md:px-12 h-full w-full text-14 md:text-18 py-24">
						{isStoreLoading ? (
							<>
								<span>Nail Store</span>
								<CircularProgress size={20} className="ml-10" color="secondary" />
							</>
						) : (
							<StoreHeader nailStores={nailStores} />
						)}
					</div>
				}
				contentToolbar={
					<div className="px-24 w-full">
						<StorePageHeader storeNavigation={storeNavigation} />
					</div>
				}
				content={
					<div className="p-24">
						<FuseSuspense>{renderRoutes(route.routes)}</FuseSuspense>
					</div>
				}
			/>
		</StoreContextProdiver>
	);
}

export default withReducer('nailsApp', reducer)(StorePageLayout);
