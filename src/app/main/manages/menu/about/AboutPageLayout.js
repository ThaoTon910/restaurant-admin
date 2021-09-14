
import FusePageCarded from '@fuse/core/FusePageCarded';

import React from 'react';
import StoreAbout from './StoreAbout';

function AboutPageLayout(){


	return (
		<FusePageCarded
			header={
				<div className="flex items-center">
					<h1>Pho 28</h1>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Addons</h4>
				</div>
			}
			content={
				<div className="p-24">
					<StoreAbout />
				</div>
			}
		/>
	);
}

export default AboutPageLayout;
