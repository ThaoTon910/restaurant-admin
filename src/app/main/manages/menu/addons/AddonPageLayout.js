import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { useDeepCompareEffect } from '@fuse/hooks';
import AddonPage from 'app/main/manages/menu/addons/AddonPage';
import FusePageCarded from '@fuse/core/FusePageCarded';

import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { getAddonGroups, openNewAddonGroupDialog, selectAddonGroups } from '../../store/addonSlice';
import AddonItemDialog from './AddonItemDialog';

function AddonPageHeader() {
	const dispatch = useDispatch();
	const onAddClick = () => {
		dispatch(openNewAddonGroupDialog());
	};

	return (
		<div>
			<h1>ADD ONS</h1>
			<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
				<Fab color="secondary" aria-label="add" onClick={onAddClick}>
					<AddIcon />
				</Fab>
			</motion.div>
		</div>
	);
}

function AddonPageLayout() {
	const addonGroups = useSelector(selectAddonGroups);
	const dispatch = useDispatch();

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
