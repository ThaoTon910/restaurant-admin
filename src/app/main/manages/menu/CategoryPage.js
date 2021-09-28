import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { MenuItemTable } from './MenuItemTable';
import { useDispatch } from 'react-redux';
import { removeCategory } from '../store/categoriesSlice';

function CategoryPage({ treeServices, updateCategory }) {
	const dispatch = useDispatch();

	return treeServices.length ? (
		treeServices.map((category, index) => (
			<Accordion key={index}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-label="Expand"
					aria-controls="additional-actions1-content"
					id="additional-actions1-header"
				>
					<div className="flex-col items-start">
						<div className="flex justify-between items-center">
							<Typography variant="h6">{category.name}</Typography>
							<IconButton
								aria-label="edit service"
								className="px-10"
								color="secondary"
								onClick={ev => {
									ev.stopPropagation();
									updateCategory({ payload: category });
								}}
							>
								<Icon>edit</Icon>
							</IconButton>

							<IconButton
								aria-label="edit service"
								className="px-10"
								onClick={ev => {
									ev.stopPropagation();
									dispatch(removeCategory(category.id))
								}}
							>
								<DeleteOutlinedIcon color="error"/>
							</IconButton>
						</div>
						{category.description && <Typography color="textSecondary">{category.description}</Typography>}
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<MenuItemTable
						menuItems={category.menuItems}
						category={category}
					/>
				</AccordionDetails>
			</Accordion>
		))
	) : (
		<div className="text-center">No Category found</div>
	);
}

export default CategoryPage;
