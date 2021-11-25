
import FusePageCarded from '@fuse/core/FusePageCarded';

import React from 'react';
import { renderRoutes } from 'react-router-config';

import FuseSuspense from '@fuse/core/FuseSuspense';
import StoreAbout from './StoreAbout';
import { StoreContextProdiver } from './context/StoreContext';
import StorePageHeader from './StorePageHeader';

function AboutPageLayout({route}){


	return (
		<StoreContextProdiver>
			<FusePageCarded
				header={
					<div className="flex items-center">
						<h1>Pho 28</h1>
					</div>
				}
				contentToolbar={
					<div className="px-24 w-full">
						<StorePageHeader />
					</div>
				}
				content={
					<div className="p-24">
						{/*<StoreAbout />*/}
						<FuseSuspense>{renderRoutes(route.routes)}</FuseSuspense>
					</div>
				}
			/>
		</StoreContextProdiver>
	);
}

export default AboutPageLayout;
