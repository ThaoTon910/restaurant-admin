import { useDispatch, useSelector } from "react-redux";
import { getAddonGroups, selectAddonGroups } from "../../store/addonSlice";
import { useDeepCompareEffect } from '@fuse/hooks';
import AddonPage from 'app/main/manages/menu/addons/AddonPage';
import AddonItemDialog from "./AddonItemDialog";
import React from 'react';

function AddonPageLayout(){
    const addonGroups = useSelector(selectAddonGroups);
    const dispatch = useDispatch();
    useDeepCompareEffect(() => {
		dispatch(getAddonGroups());
	}, [dispatch]);


    return (
        <React.Fragment>

            <AddonPage treeServices={addonGroups} />
            <AddonItemDialog />
        </ React.Fragment>
        
    )
}

export default AddonPageLayout;