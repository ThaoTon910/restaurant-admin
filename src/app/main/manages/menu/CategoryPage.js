import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { MenuItemTable } from './MenuItemTable';

function CategoryPage({ treeServices, addOrUpdateService, updateCategory }) {
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
								color="primary"
								onClick={ev => {
									ev.stopPropagation();
									updateCategory({ payload: category });
								}}
							>
								<Icon>edit</Icon>
							</IconButton>
						</div>
						{category.description && <Typography color="textSecondary">{category.description}</Typography>}
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<MenuItemTable
						menuItems={category.menuItems}
						category={category}
						// addOrUpdateService={addOrUpdateService}
					/>
				</AccordionDetails>
			</Accordion>
		))
	) : (
		<div className="text-center">No Category found</div>
	);
}

export default CategoryPage;
