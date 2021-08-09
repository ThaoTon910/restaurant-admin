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
import { openEditMenuItemDialog, openNewMenuItemDialog, deleteMenuItem } from '../store/menuItemsSlice'
import { useDispatch } from 'react-redux';
import { Storage } from 'aws-amplify';

export function MenuItemRow({ item, category }) {
	const [imgSrc, setImgSrc] = useState("");
	const dispatch = useDispatch();

	if (item.imageUrl) {
		Storage.get(item.imageUrl).then(url => setImgSrc(url))
	}
	return (
		<TableRow>
			<TableCell component="th" scope="row">
				<div className="flex items-center">

					{<img src={imgSrc ? imgSrc : "assets/images/placeholders/y9DpT.jpeg"} alt="" className="h-60 w-auto m-5" />}
					<div>{item.name}</div>
				</div>
			</TableCell>
			<TableCell className="hidden sm:table-cell">{item.description}</TableCell>
			<TableCell align="center">{item.price}</TableCell>
			<TableCell align="right">
				<div>
					<IconButton
						aria-label="edit service"
						className="px-5"
						color="primary"
						onClick={() => dispatch(openEditMenuItemDialog({...item, category}))}
					>
						<Icon>edit</Icon>
					</IconButton>
					<IconButton 
						aria-label="delete service" 
						className="px-5"
						onClick={() => dispatch(deleteMenuItem(item.id))}
						>
						<DeleteOutlinedIcon color="error" />
					</IconButton>
				</div>
			</TableCell>
		</TableRow>
	)
}


export function MenuItemTable({ menuItems, category, addOrUpdateService }) {
	const dispatch = useDispatch()

	const addNewService = ev => {
		ev.stopPropagation();
		dispatch(openNewMenuItemDialog({ category }))

	};

	return menuItems && menuItems.length ? (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell className="hidden sm:table-cell">Description</TableCell>
						<TableCell align="center">Price ($)</TableCell>
						<TableCell align="right" className="w-100">
							<IconButton className="px-5 mr-4 text-green-500" onClick={addNewService}>
								<Icon>add_circle</Icon>
							</IconButton>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{menuItems.map(row => (
						<MenuItemRow key={row.id} item={row} category={category} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		<div className="flex items-center justify-between w-full">
			<div>No service found</div>
			<IconButton className="text-green-500 pr-0" onClick={addNewService}>
				<Icon>add_circle</Icon>
			</IconButton>
		</div>
	);
}

export default memo(MenuItemTable);
