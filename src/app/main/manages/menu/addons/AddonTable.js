import { memo, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Icon from '@material-ui/core/Icon';
import { useDispatch } from 'react-redux';

import {deleteAddon, openEditAddonItemDialog, openNewAddonItemDialog} from 'app/main/manages/store/addonSlice'

export function AddonItemRow({ item }) {

    const dispatch = useDispatch();
    const onEditClick = () => {
        dispatch(openEditAddonItemDialog(item))
    }

    const onDeleteClick = () => {
        dispatch(deleteAddon(item.id))
    }
	return (
		<TableRow>
			<TableCell component="th" scope="row">
			{item.name}
			</TableCell>
			<TableCell align="center">{item.price}</TableCell>
			<TableCell align="right">
				<div>
					<IconButton
						aria-label="edit service"
						className="px-5"
						color="primary"
						onClick={onEditClick}
					>
						<Icon>edit</Icon>
					</IconButton>

					<IconButton 
						aria-label="delete service" 
						className="px-5"
						onClick={onDeleteClick}
						>
						<DeleteOutlinedIcon color="error" />
					</IconButton>
				</div>
			</TableCell>
		</TableRow>
	)
}


export function AddonTable({ addonGroup }) {
	const dispatch = useDispatch()

	const onAddClick = () => {
		dispatch(openNewAddonItemDialog(addonGroup.id))
	};

    const {addons} = addonGroup

	return addons && addons.length ? (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="center">Price ($)</TableCell>
						<TableCell align="right" className="w-100">
							<IconButton className="px-5 mr-4 text-green-500" onClick={onAddClick}>
								<Icon>add_circle</Icon>
							</IconButton>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{addons.map(row => (
						<AddonItemRow key={row.id} item={row}  />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		<div className="flex items-center justify-between w-full">
			<div>No service found</div>
			<IconButton className="text-green-500 pr-0" onClick={() => {}}>
				<Icon>add_circle</Icon>
			</IconButton>
		</div>
	);
}

export default memo(AddonTable);
