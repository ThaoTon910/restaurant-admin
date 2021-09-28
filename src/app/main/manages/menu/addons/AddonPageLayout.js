import { useDispatch, useSelector } from "react-redux";
import { getAddonGroups, openNewAddonGroupDialog, selectAddonGroups } from "../../store/addonSlice";
import { motion } from 'framer-motion';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { useDeepCompareEffect } from '@fuse/hooks';
import AddonPage from 'app/main/manages/menu/addons/AddonPage';
import AddonItemDialog from "./AddonItemDialog";
import AddonGroupDialog from "./AddonGroupDialog";

import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple'


function AddonPageHeader() {
    const dispatch = useDispatch();
    const onAddClick = () => {
        dispatch(openNewAddonGroupDialog())
    }

    return (
        <div>
            <h1>ADD ONS</h1>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
			<Fab color="secondary" aria-label="add" onClick={onAddClick}>
				<AddIcon />
			</Fab>
		</motion.div>
        </div>
    )
}

function AddonPageLayout() {
    const addonGroups = useSelector(selectAddonGroups);
    const dispatch = useDispatch();
    useDeepCompareEffect(() => {
        dispatch(getAddonGroups());
    }, [dispatch]);


    return (
        <FusePageSimple
            header={<AddonPageHeader />}
            content={
                <>
                    <AddonPage treeServices={addonGroups} />
                    <AddonItemDialog />
                    <AddonGroupDialog />
                </>
            }
        />


    )
}

export default AddonPageLayout;