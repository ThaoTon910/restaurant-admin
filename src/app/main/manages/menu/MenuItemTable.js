import { memo } from 'react';
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

export function MenuItemTable({ menuItems, category, addOrUpdateService }) {
	const addNewService = ev => {
		ev.stopPropagation();
		// addOrUpdateService({
		// 	type: 'add',
		// 	payload: { category }
		// });
	};
	const editService = (ev, service) => {
		ev.stopPropagation();
		// addOrUpdateService({
		// 	type: 'edit',
		// 	payload: { service, category }
		// });
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
						<TableRow key={row.id}>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell className="hidden sm:table-cell">{row.description}</TableCell>
							<TableCell align="center">{row.price}</TableCell>
							<TableCell align="right">
								<div>
									<IconButton
										aria-label="edit service"
										className="px-5"
										color="primary"
										onClick={ev => editService(ev, row)}
									>
										<Icon>edit</Icon>
									</IconButton>
									<IconButton aria-label="delete service" className="px-5">
										<DeleteOutlinedIcon color="error" />
									</IconButton>
								</div>
							</TableCell>
						</TableRow>
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
