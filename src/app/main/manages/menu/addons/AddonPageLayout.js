import { useDispatch, useSelector } from "react-redux";
import { getAddonGroups, selectAddonGroups } from "../../store/addonSlice";
import { useDeepCompareEffect } from '@fuse/hooks';
import AddonPage from 'app/main/manages/menu/addons/AddonPage';
import AddonItemDialog from "./AddonItemDialog";
import FusePageCarded from '@fuse/core/FusePageCarded';

import React from 'react';

function AddonPageLayout(){
    const addonGroups = useSelector(selectAddonGroups);
    const dispatch = useDispatch();
    useDeepCompareEffect(() => {
		dispatch(getAddonGroups());
	}, [dispatch]);

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
					<AddonPage treeServices={addonGroups} />
					<AddonItemDialog />
				</div>
			}
		/>
	);
}

export default AddonPageLayout;
