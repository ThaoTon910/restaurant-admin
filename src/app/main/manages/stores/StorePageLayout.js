import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import clsx from 'clsx';
import { useRef, useEffect, useState, useCallback } from 'react';
import FuseNavigation from '@fuse/core/FuseNavigation/FuseNavigation';
import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { renderRoutes } from 'react-router-config';

import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';

import { selectStores, getStores } from './store/storesSlice';

import StoreNavigation from './StoreNavigation';
import StorePageBreadcrumb from './StorePageBreadcrumb';
import StoreSelection from './StoreSelection';
import withReducer from '../../../store/withReducer';

function StorePageLayout({ content, route }) {
	const pageLayout = useRef(null);
	const dispatch = useDispatch();

	const nailStores = useSelector(selectStores);
	const isStoreLoading = useSelector(({ nailsApp }) => nailsApp.stores.loading);

	useEffect(() => {
		dispatch(getStores());
	}, [dispatch]);
	return (
		<FusePageSimple
			classes={{
				root: 'h-full',
				contentWrapper: 'p-16 md:p-24',
				content: 'flex flex-col h-full',
				leftSidebar: 'w-288 pt-8',
				header: 'h-64 min-h-64',
				wrapper: 'min-h-0'
			}}
			header={
				<div className="flex items-center justify-center px-4 md:px-12 h-full w-full">
					<Hidden lgUp>
						<IconButton
							onClick={ev => pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>
					<div className="flex flex-1 items-center sm:justify-center px-8 lg:px-12">
						<div className="text-14 md:text-18 font-medium flex items-center">
							{isStoreLoading ? (
								<>
									<span>Nail Store</span>
									<CircularProgress size={20} className="ml-10" color="secondary" />
								</>
							) : (
								<StoreSelection nailStores={nailStores} />
							)}
						</div>
					</div>
				</div>
			}
			content={
				<div className="max-w-2xl min-h-full flex flex-auto flex-col">
					<StorePageBreadcrumb />
					<div className="flex flex-col flex-1 relative py-32">
						<FuseSuspense>{renderRoutes(route.routes)}</FuseSuspense>
					</div>
				</div>
			}
			leftSidebarContent={<FuseNavigation className={clsx('navigation')} navigation={StoreNavigation.children} />}
			sidebarInner
			ref={pageLayout}
		/>
	);
}

export default withReducer('nailsApp', reducer)(StorePageLayout);
